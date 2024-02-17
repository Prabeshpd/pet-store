import { userFactory } from '@/test/factories/users';

import UserManager from './users';
import UserRepository from '@/repositories/users';

describe('UserManager:', () => {
  const userRepository = new UserRepository();
  const userManager = new UserManager(userRepository);

  describe('createUser', () => {
    describe('given valid params', () => {
      const user = userFactory();
      it('creates the user successfully with encrypted password', async () => {
        const userPayload = {
          name: 'dev coolblue',
          email: 'dev@coolbluehq.co',
          password: user.password
        };

        const createdUser = await userManager.create(userPayload);

        expect(createdUser.email).toEqual('dev@coolbluehq.co');
        expect(createdUser.name).toEqual('dev coolblue');
      });
    });

    describe('given email is NOT unique', () => {
      it('throws error', async () => {
        const user = userFactory();
        const userPayload = {
          name: user.name,
          email: 'unique.user@coolblue.co',
          password: user.password
        };

        await userManager.create(userPayload);

        await expect(userManager.create(userPayload)).rejects.toHaveProperty(
          'message',
          'Account with this email already exists.'
        );
      });
    });
  });
});
