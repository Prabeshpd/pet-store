import { Router } from 'express';

import petController from '@/controllers/pets';

const userRouter = Router();

userRouter.post('/', petController.create);

export default userRouter;
