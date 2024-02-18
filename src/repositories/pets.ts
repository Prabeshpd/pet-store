import { Prisma, Pet } from '@prisma/client';

import dbClient from '@/config/database';

export type PetPayload = Prisma.PetCreateInput;
export type PetSchema = Pet;
export interface IPetRepository {
  create: (payload: PetPayload) => Promise<PetSchema>;
}

class PetRepository implements IPetRepository {
  create = async (payload: PetPayload) => {
    const pet = await dbClient.pet.create({ data: payload });

    return pet;
  };
}

export default PetRepository;
