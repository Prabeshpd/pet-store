import { Router } from 'express';

import petController from '@/controllers/pets';
import { schema } from '@/middlewares/validate';

import { petSchema } from './schema';

const userRouter = Router();

userRouter.post('/', schema(petSchema), petController.create);

export default userRouter;
