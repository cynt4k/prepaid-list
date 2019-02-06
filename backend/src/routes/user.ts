import express, { Router } from 'express';

import { UserController } from '../controllers';

const router: Router = Router();

router.post('/', UserController.registerUser);

export const UserRouter: Router = router;
