import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../getUserProfileUseCase";

export function makeGetUserProfileUseCase() {
  
  const prismaUserRepository = new PrismaUserRepository();
  const useCase = new GetUserProfileUseCase(prismaUserRepository);

  return useCase;
}
