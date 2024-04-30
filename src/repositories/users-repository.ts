import { Prisma, User } from "@prisma/client";

export interface UsersRepositoroy {
  findyByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}