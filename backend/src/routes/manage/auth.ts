import express, { Router, Request, Response, NextFunction } from 'express';

import { ProductController, AuthController } from '../../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../../core';
import { ProductValidator } from '../../misc/validators';
import { AclRight } from '../../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.post('/', AuthController.postLoginManage);

export const AuthManageRouter: Router = router;
