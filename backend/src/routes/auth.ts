import express, { Router } from 'express';

import { AuthController } from '../controllers';
import { CheckAuth, CheckAcl } from '../core';

const router: Router = Router();

router.post('/login/token', AuthController.postLoginToken);
router.post('/login/user', AuthController.postLoginUsername);
router.post('/refresh', CheckAuth.isAuth, AuthController.renewToken);
router.post('/register', AuthController.postRegister);

export const AuthRouter: Router = router;
