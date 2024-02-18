import { petFactory } from '@/test/factories/pets';

import PetManager from './pets';

import PetRepository from '@/repositories/pets';
import UserRepository from '@/repositories/users';
import { Species } from '@prisma/client';

describe('UserManager:', () => {
  const userRepository = new UserRepository();
  const petRepository = new PetRepository();
  const petManager = new PetManager(petRepository);

  describe('createPet', () => {
    describe('given valid params', () => {
      it('creates the pet records successfully', async () => {
        const userPayload = {
          name: 'dev coolblue',
          email: 'dev@coolbluehq.co',
          password: 'random'
        };
        const createdUser = await userRepository.createUser(userPayload);

        const petPayload = {
          ...petFactory(),
          user: { connect: { id: createdUser.id } },
          name: 'Tom',
          species: Species.cat
        };
        const createdPet = await petManager.create(petPayload);

        expect(createdPet.species).toEqual(Species.cat);
        expect(createdPet.name).toEqual('Tom');
      });
    });
  });
});
