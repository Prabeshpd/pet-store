import { PetSchema } from '@/repositories/pets';

class PetPresenters {
  constructor() {}

  async listPets(pets: any[]) {
    return pets;
  }

  findDetail(pet: PetSchema) {
    return { ...pet, extraInformation: 'This is extra information' };
  }
}

export default PetPresenters;
