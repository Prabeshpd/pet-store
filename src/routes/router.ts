import { Request, Response, Router } from 'express';

import PetControllers from '@/controllers/pets';

const generalRouter = Router();

generalRouter.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

generalRouter.get('/pets', PetControllers.listPets);

export { generalRouter };
