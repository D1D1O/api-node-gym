import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCAse } from "../registerUseCase";

export function makeRegisterUseCase(){
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCAse(userRepository);
  
  return registerUseCase;
}