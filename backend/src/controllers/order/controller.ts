import { response, HttpCodes } from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order, Product, User } from '../../models';
import { IOrderModel } from '../../types/models';
import { IProductOrder } from '../../types/models/nested';
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
                        throw new PrepaidListError('jo', ErrorCode.UNKNOWN);
                    }
                    return {
                        productId: productInfo.id,
                        quantity: product.quantity,
                        price: productInfo.price
                    };
                }).reduce(async (accProm: Promise<IProductOrder[]>, cur) => {
                    const value = await cur;
                    const acc = await accProm;
                    acc.push({
                        productId: value.productId,
                        quantity: value.quantity,
                        price: value.price,
                        totalPrice: value.price * value.quantity
                    });
                    newOrder.totalPrice += value.price * value.quantity;
                    return acc;
                }, Promise.resolve([]));
            const result = await Order.create(newOrder);
            newOrder.user.balance -= newOrder.totalPrice;
            const resultUser = await newOrder.user.save();
            if (resultUser) {
                return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
            }
            return response(res, HttpCodes.InternalServerError, I18n.ERR_INTERNAL_SERVER);
        } catch (e) {
            return next(e);
        }
    };
    export const getOrdersForUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await Order.find({ user: req.user!.id });
            if (result) {
                return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
            }
            return response(res, HttpCodes.NotFound, I18n.WARN_NO_ORDERS_FOUND);
        } catch (e) {
            return next(e);
        }
    };
}
