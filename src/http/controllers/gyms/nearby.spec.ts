import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to list nearby gyms', async () => {

    const {token} = await createAndAuthenticateUser(app,true);

    await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Gym Test',
          description: 'Rua Teste',
          phone: '1234567891',
          latitude: -3.073817,
          longitude: -60.031578,
          photo:''
        });

    await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Live Test',
          description: 'Rua Teste',
          phone: '123456789',
          latitude: -2.060891,
          longitude: -60.024684,
          photo:''
        });

    const response = await request(app.server)
        .get('/gyms/nearby')
        .query({          
          latitude: -2.060891,
          longitude: -60.024684,
        })
        .set('Authorization', `Bearer ${token}`)
        .send();
            
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
