import { CheckIn, Prisma, User } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class inMemoryCheckInsRepository implements CheckInsRepository {

  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {

    const CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      createdAt: new Date(),
    }
    this.items.push(CheckIn);
    return CheckIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {

    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id === userId  && isOnSameDate;
    }
    );

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;

  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
        .filter((checkIn) => checkIn.user_id === userId)
        .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  async getCheckIns(userId: string){

    const checkIns = this.items
        .filter((checkIn) => checkIn.user_id === userId);
    return checkIns;
  }

  async countByUserId(userId: string){

    const checkIns = this.items
        .filter((checkIn) => checkIn.user_id === userId);
    return checkIns.length;
  }

  async findById(checkInId: string) {
    return this.items.find((checkIn) => checkIn.id === checkInId) || null;
  }

  async save(checkIn: CheckIn) {

    const index = this.items.findIndex((item) => item.id === checkIn.id);
    
    if(index>=0){
      this.items[index] = checkIn;
    }
    return checkIn;
    
  }

}