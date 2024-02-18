import { Router } from 'express';

import petController from '@/controllers/pets';
import { schema } from '@/middlewares/validate';
import authenticate from '@/middlewares/auth';

import { petSchema } from './schema';

const petRouter = Router();

petRouter.post('/', schema(petSchema), authenticate, petController.create);

export default petRouter;
