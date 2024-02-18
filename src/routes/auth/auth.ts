import { Router } from 'express';

import authController from '@/controllers/auth';
import { schema } from '@/middlewares/validate';

import { authLoginSchema, refreshSchema } from './authSchema';

const authRouter = Router();

authRouter.post('/login', schema(authLoginSchema), authController.login);
authRouter.post('/refresh', schema(refreshSchema), authController.refreshToken);

export default authRouter;
