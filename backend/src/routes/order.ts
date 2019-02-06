import express, { Router } from 'express';

import { OrderController } from '../controllers';
import { CheckAcl, CheckAuth } from '../core';
import { AclRight } from '../types/models';

const router: Router = Router();

router.post('/', CheckAuth.isAuth, CheckAcl.middlewareIsAllowed(AclRight.PREPAID_ALLOW), OrderController.submitNewOrder);
router.get('/ordersForUser', OrderController.getOrdersForUser);

export const OrderRouter: Router = router;
