import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";


describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to register a new user', async () => {
    const response = await request(app.server)
        .post('/user')
        .send({
          name: 'John Doe',
          email: 'John@e.com',
          password: '123456'
        })
    expect(response.statusCode).toEqual(201)
  });
});
