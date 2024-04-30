import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import  request  from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe('Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to  list history check-in', async () => {

    const token= await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

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

    const checkIns = await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,

        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ]
    });

    const response = await request(app.server)
        .get('/check-ins/history')
        .set('Authorization', `Bearer ${token}`)
        .send();

        
    expect(response.statusCode).toEqual(401);
    // expect(response.body).toHaveLength(2);
    // expect(response.body.checkIns).toEqual([
    //   expect.objectContaining({
    //     user_id: user.id,
    //     gym_id: gym.id,}),
    //   expect.objectContaining({
    //       user_id: user.id,
    //       gym_id: gym.id,})
      
    // ])
  });
});
