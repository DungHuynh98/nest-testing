import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AppController (E2E)', () => {
  let app;
  let server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users', () => {
    it('GET /users should return an array of users', async () => {
      const response = await request(server).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('POST /users should create a new user', async () => {
      const createUserDto = { name: 'John' };

      const response = await request(server)
        .post('/users')
        .send(createUserDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(createUserDto.name);
    });
  });

  describe('/users/:id', () => {
    it('GET /users/:id should return a user by ID', async () => {
      const createUserDto = { name: 'John' };
      const createResponse = await request(server)
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;

      const response = await request(server).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: userId, name: createUserDto.name });
    });

    it('GET /users/:id should return 404 if user is not found', async () => {
      // Assuming you're using a user service with a findById method

      // Create a mock user ID that does not exist in the database
      const nonExistentUserId = -1;

      // Make a request to the endpoint with the non-existent user ID
      const response = await request(server).get(`/users/${nonExistentUserId}`);

      // Assert that the response status is 404 (Not Found)
      expect(response.status).toBe(404);
      // Assert that the response body contains an appropriate error message
      expect(response.body.message).toEqual('user not found');
    });

    it('PATCH /users/:id should update a user by ID', async () => {
      const createUserDto = { name: 'John' };
      const createResponse = await request(server)
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;
      const updateUserDto = { name: 'Jane' };

      const response = await request(server)
        .patch(`/users/${userId}`)
        .send(updateUserDto);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: userId, name: updateUserDto.name });
    });

    it('DELETE /users/:id should delete a user by ID', async () => {
      const createUserDto = { name: 'John' };
      const createResponse = await request(server)
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;

      const response = await request(server).delete(`/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ deleted: 1 });
    });
  });
});