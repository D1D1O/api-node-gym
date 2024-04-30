import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";


describe('Authenticate (e2e)', () => {
  beforeAll(async () => {

    await app.ready()
  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to Authenticate', async () => {

    await request(app.server)
    .post('/user')
    .send({
      name: 'John Doe',
      email: 'John@e.com',
      password: '123456'
    });

    const response = await request(app.server)
        .post('/sessions')
        .send({
          "email":"John@e.com",
          "password":"123456"
        });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

  });
});
