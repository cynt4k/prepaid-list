import express, { Router } from 'express';
import { CheckAuth } from '../core/auth';
import { ErrorHandler } from '../core/express';
import { check } from 'express-validator/check';

import { UserController } from '../controllers/user';

const router: Router = Router();

router.get('/', CheckAuth.isAuth, UserController.getUser);
router.put('/', CheckAuth.isAuth, [check('token').not()], ErrorHandler.validateBody, UserController.putUpdateUser);
router.put('/token', CheckAuth.isAuth, [check('token').isString()], ErrorHandler.validateBody, UserController.putUpdateToken);

export const UserRouter = router;