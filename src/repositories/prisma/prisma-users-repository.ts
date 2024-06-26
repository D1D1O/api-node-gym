import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepositoroy } from "../users-repository";

export class PrismaUserRepository implements UsersRepositoroy{

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }

  async findyByEmail(email: string) {

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;

  }

  async create(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data
    });
    return user;
  }

}