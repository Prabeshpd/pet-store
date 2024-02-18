import { Request, Response, Router } from 'express';

// import PetControllers from '@/controllers/pets';
import userRouter from './users/users';
import authRouter from './auth/auth';
import petRouter from './pets/pets';

const generalRouter = Router();
const appRouter = Router();

generalRouter.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// generalRouter.get('/pets', PetControllers.listPets);
appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/pets', petRouter);

export { generalRouter, appRouter };
