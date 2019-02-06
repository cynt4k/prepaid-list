import express, { Router } from 'express';

import { UserController } from '../controllers';

const router: Router = Router();

router.get('/', UserController.getAllUser);

export const UserRouter: Router = router;
