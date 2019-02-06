import express, { Router } from 'express';
import { ProfileValidator } from '../misc/validators';
import { ProfileController } from '../controllers';
import { CheckAuth } from '../core';

const router: Router = Router();

router.get('/', CheckAuth.isAuth, ProfileController.getProfile);
router.put('/', CheckAuth.isAuth, ProfileValidator.updateUser(), ProfileController.putUpdateUser);

export const ProfileRouter: Router = router;
