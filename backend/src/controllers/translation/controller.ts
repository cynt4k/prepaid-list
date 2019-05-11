import { response, HttpCodes }  from '../../core/express';
import express, { Request, Response, NextFunction } from 'express';
import { Order, Product, Category } from '../../models';
import { IOrderModel, IProductModel, ICategoryModel, ITranslationModel } from '../../types/models';
import { Template, I18n } from '../../misc';
import { Translation } from '../../models/translation';

export namespace TranslationController {

    export const postTranslation = async (req: Request, res: Response, next: NextFunction) => {
        const newTranslation: ITranslationModel = new Translation(req.body);
        try {
            const result = await newTranslation.save();
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
        } catch (e) {
            return next(e);
        }
    };

    export const getTranslations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await Translation.find().exec();
            if (!result) return response(res, HttpCodes.NotFound, I18n.VAL_TRANSLATION_MISSING);
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
        } catch (e) {
            return next(e);
        }
    };
}
