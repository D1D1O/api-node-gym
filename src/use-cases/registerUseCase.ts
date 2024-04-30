import { UsersRepositoroy } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCAse {
  constructor (private usersRepositoroy: UsersRepositoroy){}

  async execute({ name, email, password }:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
  
    const password_hash = await hash(password, 6);
  
    // SOLID
    // S - Single Responsibility Principle
    // O - Open/Closed Principle
    // L - Liskov Substitution Principle
    // I - Interface Segregation Principle
    // D - Dependency Inversion Principle
  
    const userWithSameEmail = await this.usersRepositoroy.findyByEmail(email);
  
    if(userWithSameEmail){
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepositoroy.create({
      name,
      email,
      password_hash
    });
    return { 
      user
    }
  }
}

