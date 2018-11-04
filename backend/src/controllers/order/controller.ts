import { Response, NextFunction } from "express";
import { Types } from 'mongoose';
import { Request } from '../../types/express';
import { HttpCodes, response } from '../../core/express';
import { validationResult } from 'express-validator/check';
import { Category, Product, History, User } from '../../models';
import { ICategoryModel, IProductModel, IHistoryModel } from '../../types/models';
import { IProductHistory } from '../../types/models/nested';

export namespace OrderController {
    export let getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await Category.find();
            return response(res, HttpCodes.OK, 'OK', categories);
        } catch (e) {
            return next(e);
        }
    };

    export let getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
        const categoryId: Types.ObjectId = req.params.id;
        try {
            const category = await Category.findById(categoryId);
            if (!category) return response(res, HttpCodes.NotFound, 'Category not found');
            return response(res, HttpCodes.OK, 'OK', category);
        } catch (e) {
            return next(e);
        }
    };

    export let putCategory = async (req: Request, res: Response, next: NextFunction) => {
        const updatedCategory: ICategoryModel = req.body;
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, updatedCategory);
            return response(res, HttpCodes.OK);
        } catch (e) {
            return next(e);
        }
    };

    export let postCategory = async (req: Request, res: Response, next: NextFunction) => {
        const newCategory: ICategoryModel = new Category(req.body);
        try {
            const result = await newCategory.save();
            return response(res, HttpCodes.Created, 'OK');
        } catch (e) {
            return next(e);
        }
    };

    export let postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
        const newProduct: IProductModel = new Product(req.body);
        try {
            const result = await newProduct.save();
            return response(res, HttpCodes.Created, 'OK', result);
        } catch (e) {
            return next(e);
        }
    };

    export let postAddProductToCategory = async (req: Request, res: Response, next: NextFunction) => {
        const productId: Types.ObjectId = req.params.id;
        const categoryId: Types.ObjectId = req.params.categoryId;
        try {
            const product = await Product.findById(productId);
            if (!product) return response(res, HttpCodes.NotFound, 'Product not found');
            const category = await Category.findById(categoryId);
            if (!category) return response(res, HttpCodes.NotFound, 'Category not found');
            category.products.push(product);
            await category.save();
            return response(res, HttpCodes.OK, 'OK');
        } catch (e) {
            return next(e);
        }
    };

    export let postCreateOrder = async (req: Request, res: Response, next: NextFunction) => {
        interface IOrderProducts {
            id: Types.ObjectId,
            categoryId: Types.ObjectId,
            quantity: number
        }

        const userId: Types.ObjectId = req.user!.id;
        const products: Array<IOrderProducts> = req.body.products;
        let orderList: IProductHistory[] = [];
        let newOrder: IHistoryModel = new History({
            user: userId,
            totalPrice: 0,
            products: orderList
        });

        try {
            const user = await User.findById(userId);
            if (!user) return response(res, HttpCodes.NotFound, 'User not found');
            for (const orderProduct of products) {
                const product = await Product.findById(orderProduct.id);
                if (!product) return response(res, HttpCodes.NotFound, `Product ${orderProduct.id} not found`);
                const category = await Category.findById(orderProduct.categoryId);
                if (!category) return response(res, HttpCodes.NotFound, `Category ${orderProduct.categoryId} not found`);
                orderList.push({
                    id: orderProduct.id,
                    price: category.price,
                    totalPrice: category.price * orderProduct.quantity,
                    quantity: orderProduct.quantity
                });
                newOrder.totalPrice += category.price * orderProduct.quantity;
            }
            newOrder.products = orderList;
            await newOrder.save();
            try {
                user.balance -= newOrder.totalPrice;
                await user.save();
                return response(res, HttpCodes.Created, 'OK');
            } catch (e) {
                await History.deleteOne(newOrder);
                return next(e);
            }
        } catch (e) {
            return next(e);
        }
    };
}

let test = {
    products: [{
        id: 234,
        categoryId: 12,
        quantity: 2
    },]
};