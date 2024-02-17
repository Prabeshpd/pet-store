import { Request, Response, Router } from 'express';

import PetControllers from '@/controllers/pets';
import userRouter from './users/users';
import authRouter from './auth/auth';

const generalRouter = Router();
const appRouter = Router();

generalRouter.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

generalRouter.get('/pets', PetControllers.listPets);
appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);

export { generalRouter, appRouter };
