import { Response, NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthorizedRequest } from '@/middlewares/auth';
import PetRepository, { IPetRepository } from '@/repositories/pets';
import PetManager from '@/services/pets/pets';

class PetController {
  repository: IPetRepository;

  constructor() {
    this.repository = new PetRepository();
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    const authorizedRequest = request as unknown as AuthorizedRequest;
    const payload = request.body;
    const userId = authorizedRequest.user.id;
    const petPayload = { ...payload, userId };
    console.log({ petPayload });
    new PetManager(this.repository)
      .create(petPayload)
      .then((data) => response.status(StatusCodes.CREATED).json(data))
      .catch((error) => next(error));
  };
}

export default new PetController();
