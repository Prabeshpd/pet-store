import { Router } from 'express';

import petController from '@/controllers/pets';
import { schema } from '@/middlewares/validate';
import authenticate from '@/middlewares/auth';

import { createSchema, updateSchema } from './schema';

const petRouter = Router();

petRouter.post('/', authenticate, schema(createSchema), petController.create);
petRouter.put('/:id', authenticate, schema(updateSchema), petController.update);

export default petRouter;
