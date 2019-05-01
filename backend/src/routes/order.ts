import express, { Router, Request, Response, NextFunction } from 'express';

import { OrderController } from '../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../core';
import { OrderValidator } from '../misc/validators';
import { AclRight } from '../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.post('/', CheckAuth.isAuth, CheckAcl.middlewareIsAllowed(AclRight.ORDER_ADD),
    OrderValidator.newOrder(), OrderController.submitNewOrder);
router.get('/ordersForUser', CheckAuth.isAuth, OrderController.getOrdersForUser);
export const OrderRouter: Router = router;
