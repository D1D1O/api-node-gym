import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    });
    return checkIn;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });
    return checkIn;
  }
  async findByUserId(userId: string) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      }
    });
    return checkIns;
  }
  async save(checkIn: CheckIn) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id
      },
      data: checkIn
    });
    return updatedCheckIn;
  }
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });
    return count;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      skip: (page -1) * 20,
      take: 20
    });
    return checkIns;

  }
  async findByUserIdOnDate(userId: string, date: Date) {
   
    const startOfTheDay = dayjs(date).startOf("date").toDate();
    const endOfTheDay = dayjs(date).endOf("date").toDate();
    
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: startOfTheDay,
          lte: endOfTheDay
        
        }
      }
    });
    return checkIn;
  }
  async getCheckIns(userId: string) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      }
    });
    return checkIns;
  }
}