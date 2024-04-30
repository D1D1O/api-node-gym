import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to create a gym', async () => {

    const {token} = await createAndAuthenticateUser(app,true);

    await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Gym Test',
          description: 'Rua Teste',
          phone: '123456789',
          latitude: -3.0948729,
          longitude: -60.0375103,
          photo:''
        });
    await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Live Test',
          description: 'Rua Teste',
          phone: '123456789',
          latitude: -3.0948729,
          longitude: -60.0375103,
          photo:''
        });
    const response = await request(app.server)
    .get('/gyms/search')
    .query({q: 'Live Test', page: 1})
    .set('Authorization', `Bearer ${token}`)
    .send()
        
    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual(
      [
        expect.objectContaining({
          title: 'Live Test',
        })
      ]
    )

  });
});
