import { IPetRepository } from '@/repositories/pets';

class PetManager {
  petRepository: IPetRepository;

  constructor(petRepository: IPetRepository) {
    this.petRepository = petRepository;
  }

  async listPets() {
    try {
      const pets = await this.petRepository.listPets();

      return pets;
    } catch (error) {
      throw error;
    }
  }
}

export default PetManager;
