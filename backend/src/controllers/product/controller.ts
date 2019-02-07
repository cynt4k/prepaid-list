import { response, HttpCodes }  from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order, Product, Category } from '../../models';
import { IOrderModel, IProductModel, ICategoryModel } from '../../types/models';
import { Template, I18n } from '../../misc';

export namespace ProductController {

    export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Product.find().populate('name').exec();
            if (!products) return response(res, HttpCodes.NotFound, I18n.WARN_NO_PRODUCTS_FOUND);
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, products);
        } catch (e) {
            return next(e);
        }
    };

    export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await Category.find().exec();
            if (!categories) return response(res, HttpCodes.NotFound, I18n.WARN_NO_CATEGORIES_FOUND);
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, categories);
        } catch (e) {
            return next(e);
        }
    };

    export const getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await Category.find().populate('name').populate('products').exec();
            if (!categories) return response(res, HttpCodes.NotFound, I18n.WARN_NO_CATEGORIES_FOUND);
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, categories);
        } catch (e) {
            return next(e);
        }
    };

    export const postCategory = async (req: Request, res: Response, next: NextFunction) => {
        const newCategory: ICategoryModel = new Category(req.body);
        try {
            const result = await newCategory.save();
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
        } catch (e) {
            return next(e);
        }
    };
}
