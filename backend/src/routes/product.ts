import express, { Router, Request, Response, NextFunction } from 'express';

import { ProductController } from '../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../core';
import { ProductValidator } from '../misc/validators';
import { AclRight } from '../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.get('/products', ProductController.getAllProducts);
router.get('/product/:barcode', ProductController.getProductByBarcode);
router.get('/categories/all', ProductController.getAll);
router.get('/categories', ProductController.getCategories);
router.get('/category/:id/products', ProductController.getAllProductsForCategory);

export const ProductRouter: Router = router;
