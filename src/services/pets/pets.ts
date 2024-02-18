import { PetPayload, PetSchema, IPetRepository } from '@/repositories/pets';

// import PetError from './error';

export interface IPetManager {
  create: (payload: PetPayload) => Promise<PetSchema>;
}

class PetManager implements IPetManager {
  private petRepository: IPetRepository;

  constructor(petRepository: IPetRepository) {
    this.petRepository = petRepository;
  }

  create = async (payload: PetPayload) => {
    try {
      const pets = await this.petRepository.create(payload);

      return pets;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };
}

export default PetManager;
