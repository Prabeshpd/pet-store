import dbClient from '@/config/database';
import PetRepository from './pets';
import { userFactory } from '@/test/factories/users';
import { petFactory } from '@/test/factories/pets';

describe('Pet Repository', () => {
  const petRepository = new PetRepository();

  describe('create', () => {
    describe('given valid params', () => {
      it('creates pets', async () => {
        const user = userFactory();
        const userEmail = 'dev@coolblue.co';
        const userPayload = { ...user, email: userEmail };
        const createdUser = await dbClient.user.create({ data: userPayload });
        const pets = petFactory();
        const petPayload = { ...pets, user: { connect: { id: createdUser.id } } };
        const createdPet = await petRepository.create(petPayload);

        const data = await dbClient.pet.findUnique({ where: { id: createdPet.id } });
        expect(data).not.toBeNull();
        expect(data?.userId).toBe(createdUser.id);
      });
    });

    describe('given INVALID params', () => {
      it('rejects with error', async () => {
        const petPayload = { ...petFactory(), user: { connect: { id: 3 } } };

        await expect(petRepository.create(petPayload)).rejects.toThrow();
      });
    });
  });
});
