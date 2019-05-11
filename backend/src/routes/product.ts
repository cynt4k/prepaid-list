import express, { Router, Request, Response, NextFunction } from 'express';

import { ProductController } from '../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../core';
import { ProductValidator } from '../misc/validators';
import { AclRight } from '../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.get('/products', ProductController.getAllProducts);
router.get('/product/:barcode', CheckAuth.isAuth, ProductController.getProductByBarcode);
router.get('/categories/all', CheckAuth.isAuth, ProductController.getAll);
router.get('/categories', CheckAuth.isAuth, CheckAcl.middlewareIsAllowed(AclRight.PRODUCT_GET), ProductController.getCategories);
router.get('/category/:id/products',
    CheckAuth.isAuth,
    CheckAcl.middlewareIsAllowed(AclRight.CATEGORY_GET, AclRight.PRODUCT_GET),
    ProductController.getAllProductsForCategory);

export const ProductRouter: Router = router;
