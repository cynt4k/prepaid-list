import { response, HttpCodes }  from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models';
import { IOrderModel } from '../../types/models';

export namespace OrderController {

    export const submitNewOrder = async(req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const newOrder: IOrderModel = <IOrderModel> req.body;
            const result = await Order.create(newOrder);
            if (result) {
                return response(res, HttpCodes.OK, 'OK', result);
            }
            return response(res, HttpCodes.InternalServerError, 'Internal server error');
        } catch (e) {
            return next(e);
        }
    };
    export const getOrdersForUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await Order.find({user: req.user!.id});
            if (result) {
                return response(res, HttpCodes.OK, 'OK', result);
            }
            return response(res, HttpCodes.NotFound, 'Could not find orders for user');
        } catch (e) {
            return next(e);
        }
    };
}
