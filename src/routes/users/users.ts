import { Router } from 'express';

import userController from '@/controllers/users';
import { schema } from '@/middlewares/validate';

import { userRegistrationSchema } from './schema';

const userRouter = Router();

userRouter.post('/', schema(userRegistrationSchema), userController.createUser);

export default userRouter;
