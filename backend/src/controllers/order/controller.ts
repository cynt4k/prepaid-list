import { response, HttpCodes } from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order, Product, User } from '../../models';
import { IOrderModel } from '../../types/models';
import { IProductOrder, IProductExtraOrder } from '../../types/models/nested';
import { Template, I18n } from '../../misc';
import { PrepaidListError } from '../../errors';
import { ErrorCode } from '../../types/error';

export namespace OrderController {

    export const submitNewOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let newOrder: IOrderModel = new Order(req.body);
            newOrder.user = req.user.id;
            newOrder = await newOrder.populate('user').execPopulate();
            newOrder.totalPrice = 0;

            newOrder.products = await newOrder.products
                .map(async (product) => {
                    const productInfo = await Product.findById(product.productId).exec();
                    if (!productInfo) {
                        throw new PrepaidListError('Unknown productId', ErrorCode.UNKNOWN);
                    }

                    const extras: IProductExtraOrder[] = (product.extras || []).map((extra): IProductExtraOrder => {
                        const productExtraInfo = productInfo.extras.find((elem) => elem.id === extra.productId.toString());
                        if (!productExtraInfo) {
                            throw new PrepaidListError('Unknown extra productId', ErrorCode.UNKNOWN);
                        }
                        return {
                            price: productExtraInfo.price,
                            quantity: extra.quantity,
                            productId: productExtraInfo.id,
                            totalPrice: extra.quantity * productExtraInfo.price
                        };
                    });

                    return {
                        productId: productInfo.id,
                        quantity: product.quantity,
                        price: productInfo.price,
                        extras: extras
                    };
                }).reduce(async (accProm: Promise<IProductOrder[]>, cur) => {
                    const value = await cur;
                    const acc = await accProm;
                    let totalPrice = value.price * value.quantity;
                    const extras: IProductExtraOrder[] = value.extras.map((extra): IProductExtraOrder => {
                        totalPrice += extra.price * extra.quantity;
                        return {
                            price: extra.price,
                            productId: extra.productId,
                            quantity: extra.quantity,
                            totalPrice: extra.price * extra.quantity
                        };
                    });
                    acc.push({
                        productId: value.productId,
                        quantity: value.quantity,
                        price: value.price,
                        totalPrice: totalPrice,
                        extras: (extras.length !== 0 ? extras : undefined)
                    });
                    newOrder.totalPrice += totalPrice;
                    return acc;
                }, Promise.resolve([]));
            newOrder.user.balance -= newOrder.totalPrice;
            const result = await newOrder.save();
            const resultUser = await newOrder.user.save();
            if (result) {
                return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
            }
            return response(res, HttpCodes.InternalServerError, I18n.ERR_INTERNAL_SERVER);
        } catch (e) {
            if (e instanceof PrepaidListError) {
                if (e.getCode() === ErrorCode.LOW_BALANCE) {
                    return response(res, HttpCodes.BadRequest, I18n.ERR_LOW_BALANCE);
                }
            }
            return next(e);
        }
    };
    export const getOrdersForUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await Order.find({ user: req.user!.id });
            if (result.length !== 0) {
                return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
            }
            return response(res, HttpCodes.NotFound, I18n.WARN_NO_ORDERS_FOUND);
        } catch (e) {
            return next(e);
        }
    };
}
