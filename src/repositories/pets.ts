import FileManager from '@/lib/file';

export interface IPetRepository {
  listPets: () => Promise<any>;
}

class PetRepository implements IPetRepository {
  async listPets() {
    const pets = await new FileManager().readFile('');

    return JSON.parse(pets);
  }
}

export { PetRepository };
