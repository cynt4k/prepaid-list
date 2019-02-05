import { response, HttpCodes }  from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models';
import { IOrderModel } from '../../types/models';
import { Template } from '../../misc';

export namespace OrderController {

    export const submitNewOrder = async(req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const newOrder: IOrderModel = <IOrderModel> req.body;
            const result = await Order.create(newOrder);
            if (result) {
                return response(res, HttpCodes.OK, res.__(Template.I18N_INFO_SUCCESS), result);
            }
            return response(res, HttpCodes.InternalServerError, Template.ERROR_INTERNAL_SERVER);
        } catch (e) {
            return next(e);
        }
    };
    export const getOrdersForUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await Order.find({user: req.user!.id});
            if (result) {
                return response(res, HttpCodes.OK, res.__(Template.I18N_INFO_SUCCESS), result);
            }
            return response(res, HttpCodes.NotFound, res.__(Template.I18N_NO_ORDERS_FOUND, req.user.username));
        } catch (e) {
            return next(e);
        }
    };
}
