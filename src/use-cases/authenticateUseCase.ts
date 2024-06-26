import { UsersRepositoroy } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-errors";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest{
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user:User;
}

export class AuthenticateUseCase {
  constructor(
    private userRepository: UsersRepositoroy,
  ){}

  async execute({email,password}:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
    const user = await this.userRepository.findyByEmail(email);
    if(!user){
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password,user.password_hash);
    if(!doesPasswordMatch){
      throw new InvalidCredentialsError();
    }

    return {
      user,
    }

  }
}