import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";


describe('Refresh (e2e)', () => {
  beforeAll(async () => {

    await app.ready()
  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to Refresh token', async () => {

    await request(app.server)
    .post('/user')
    .send({
      name: 'John Doe',
      email: 'John@e.com',
      password: '123456'
    });

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
          "email":"John@e.com",
          "password":"123456"
        });
    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
    .patch('/token/refresh')
    .set('Cookie', cookies || [])
    .send();


    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    //expect(response.get('Set-Cookie')).toEqual(expect.stringContaining('refreshToken='));
    // Verificar se a resposta contém o cookie refreshToken
    // const refreshTokenCookie = response.get('Set-Cookie');
    // expect(refreshTokenCookie).toBeDefined();
    // expect(refreshTokenCookie).toEqual(expect.stringContaining('refreshToken='));

  });
});
