import express, { Router, Request, Response, NextFunction } from 'express';

import { ProductController } from '../../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../../core';
import { ProductValidator } from '../../misc/validators';
import { AclRight } from '../../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.post('/category', CheckAuth.isAuth, ProductValidator.createCategory(), ProductController.postCategory);
router.post('/', CheckAuth.isAuth, ProductValidator.createProduct(), ProductController.postProduct);

export const ProductManageRouter: Router = router;
