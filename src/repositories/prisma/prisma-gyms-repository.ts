import { prisma } from "@/lib/prisma";
import { GymsRepository, findManyNearby } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";

export class PrismaGymsRepository implements  GymsRepository{
      
    async findById(id: string) {
      const gym = await prisma.gym.findUnique({
        where: {
          id
        }
      });
      return gym;
    }
    async create(data: Prisma.GymCreateInput) {
      const gym = await prisma.gym.create({
        data
      });
      return gym;
    }
    async findManyNearby( { latitude,longitude, page }: findManyNearby) {

      const gyms = await prisma.$queryRaw<Gym[]>`
          SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) 
            * cos( radians( latitude ) ) 
            * cos( radians( longitude ) 
            - radians(${longitude}) ) 
            + sin( radians(${latitude}) ) 
            * sin( radians( latitude ) ) ) ) <= 10
      `;
      return gyms;
    }
    async searchManyByQuery(name: string, page: number) {
      const gyms = await prisma.gym.findMany({
          where: {
              title: {
                  contains: name
              }
          },
          skip: (page - 1) * 20,
          take: 20
      });
      return gyms;
    }

}