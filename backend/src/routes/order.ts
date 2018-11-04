import express, { Router } from 'express';
import { CheckAuth } from '../core/auth';
import { ErrorHandler } from '../core/express';
import { UserValidator } from '../misc/validators';
import { check, body } from 'express-validator/check';

import { OrderController } from '../controllers/order';

const router: Router = Router();

router.get('/category', CheckAuth.isAuth, ErrorHandler.validateBody, OrderController.getAllCategories);
router.post('/category', CheckAuth.isAuth, CheckAuth.isAdmin, ErrorHandler.validateBody, OrderController.postCategory);
router.post('/product', CheckAuth.isAuth, CheckAuth.isAdmin, ErrorHandler.validateBody, OrderController.postAddProduct);
router.post('/product/:id/:categoryId', CheckAuth.isAuth, CheckAuth.isAdmin, ErrorHandler.validateBody, OrderController.postAddProductToCategory);
router.put('/category/:id', CheckAuth.isAuth, CheckAuth.isAdmin, ErrorHandler.validateBody, OrderController.putCategory);
router.post('/', CheckAuth.isAuth, ErrorHandler.validateBody, OrderController.postCreateOrder);

export const OrderRouter = router;