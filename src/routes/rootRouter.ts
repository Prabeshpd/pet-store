import { Request, Response, Router } from 'express';

import PetControllers from '@/controllers/pets';
import userRouter from './users/users';

const generalRouter = Router();
const appRouter = Router();

generalRouter.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

generalRouter.get('/pets', PetControllers.listPets);
appRouter.use('/users', userRouter);

export { generalRouter, appRouter };
