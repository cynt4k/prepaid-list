import express, { Router, Request, Response, NextFunction } from 'express';

import { ProductController } from '../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../core';
import { ProductValidator } from '../misc/validators';
import { AclRight } from '../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.get('/', CheckAuth.isAuth, CheckAcl.middlewareIsAllowed(AclRight.PRODUCT_GET), ProductController.getAllProducts);
router.get('/categories', CheckAuth.isAuth, CheckAcl.middlewareIsAllowed(AclRight.PRODUCT_GET), ProductController.getCategories);

export const ProductRouter: Router = router;
