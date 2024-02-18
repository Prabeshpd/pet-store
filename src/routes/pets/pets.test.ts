import request from 'supertest';
import { Species } from '@prisma/client';

import app, { server } from '../../server';

import * as jwt from '@/lib/jwt';
import UserRepository, { UserSchema } from '@/repositories/users';
import UserManager from '@/services/users/users';
import { userFactory } from '@/test/factories/users';
import { petFactory } from '@/test/factories/pets';

describe('Pets post API:', () => {
  let token: string;
  let user: UserSchema;
  beforeAll(async () => {
    user = { ...userFactory(), email: 'unique.user@coolblue.co' };
    token = await jwt.generateAccessToken(user);
  });
  describe('given valid params', () => {
    afterEach(async () => {
      await server.close();
    });

    it('returns created pet with status 201', async () => {
      const userRepository = new UserRepository();
      const userManager = new UserManager(userRepository);
      await userManager.create(user);

      const petPayload = { ...petFactory(), name: 'Tom', species: Species.cat };
      const response = await request(app).post('/api/v1/pets').send(petPayload).set('authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('Tom');
      expect(response.body.species).toBe(Species.cat);
    });
  });

  describe('given NO authorization header is passed', () => {
    afterEach(async () => {
      await server.close();
    });

    it('throws unauthorized error', async () => {
      const petPayload = { ...petFactory(), name: 'Tom', species: Species.cat };

      const response = await request(app).post('/api/v1/pets').send(petPayload);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('given NO authorization header is passed', () => {
    afterEach(async () => {
      await server.close();
    });

    it('throws unauthorized error', async () => {
      const userRepository = new UserRepository();
      const userManager = new UserManager(userRepository);
      await userManager.create(user);
      const petPayload = { ...petFactory(), name: 'Tom', species: 'mouse' };

      const response = await request(app).post('/api/v1/pets').set('authorization', `Bearer ${token}`).send(petPayload);

      expect(response.statusCode).toBe(400);
    });
  });
});