import { response, HttpCodes }  from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order, Product } from '../../models';
import { IOrderModel, IProductModel } from '../../types/models';
import { Template, I18n } from '../../misc';

export namespace ProductController {

    export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Product.find().populate('name').exec();
            if (!products) return response(res, HttpCodes.NotFound, I18n.WARN_NO_PRODUCTS_FOUND);
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, products);
        } catch (e) {
            return next(e);
        }
    };
}
