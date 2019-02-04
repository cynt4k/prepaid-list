import express, { Router } from 'express';

import { OrderController } from '../controllers';

const router: Router = Router();

router.post('/', OrderController.submitNewOrder);
router.get('/ordersForUser', OrderController.getOrdersForUser)

export const OrderRouter: Router = router;