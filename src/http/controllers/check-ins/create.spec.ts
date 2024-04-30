import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to create check-in', async () => {

    const token= await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym Test',
        description: 'Rua Teste',
        phone: '1234567891',
        latitude: -2.060891,
        longitude: -60.024684,
        photo:''
      }
    });

    const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          latitude: -21.060891,
          longitude: -60.024684,
        });

        
    expect(response.statusCode).toEqual(401);
  });
});
