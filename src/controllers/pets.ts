import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import PetRepository, { IPetRepository } from '@/repositories/pets';
import PetManager from '@/services/pets/pets';

class PetController {
  repository: IPetRepository;

  constructor() {
    this.repository = new PetRepository();
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const payload = request.body;
    new PetManager(this.repository)
      .create(payload)
      .then((data) => response.status(StatusCodes.CREATED).json(data))
      .catch((error) => next(error));
  }
}

export default new PetController();
