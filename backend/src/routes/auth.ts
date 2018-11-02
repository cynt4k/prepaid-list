import express, { Router } from 'express';

import { AuthController } from '../controllers';

const router: Router = Router();

router.post('/login/token', AuthController.postLoginToken);
router.post('/login/user', AuthController.postLoginUsername);
router.post('/register', AuthController.postRegister);

export const AuthRouter: Router = router;
