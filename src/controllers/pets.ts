import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PetRepository, IPetRepository } from '@/repositories/pets';
import PetManager from '@/services/pets';
import PetPresenters from '@/presenters/pets';

class PetController {
  repository: IPetRepository;

  constructor() {
    this.repository = new PetRepository();
  }

  async listPets(request: Request, response: Response, next: NextFunction) {
    new PetManager(this.repository)
      .listPets()
      .then((data) => response.status(StatusCodes.OK).json(new PetPresenters().listPets(data)))
      .catch((error) => next(error));
  }
}

export default new PetController();
