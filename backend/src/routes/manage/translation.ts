import express, { Router, Request, Response, NextFunction } from 'express';

import { TranslationController } from '../../controllers';
import { CheckAcl, CheckAuth, ErrorHandler } from '../../core';
import { TranslationValidator } from '../../misc/validators';
import { AclRight } from '../../types/models';
import { body, check } from 'express-validator/check';

const router: Router = Router();

router.post('/', CheckAuth.isAuth, TranslationValidator.createTranslation(), TranslationController.postTranslation);

export const TranslationManageRouter: Router = router;
