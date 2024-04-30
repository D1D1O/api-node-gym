import { UsersRepositoroy } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;

}

interface SearchGymsUseCaseResponse {
  gyms: Gym[] ;
}

export class SearchGymsUseCase {
  constructor (private gymsRepositoroy: GymsRepository){}

  async execute({ query, page }:SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
  
  
    // SOLID
    // S - Single Responsibility Principle
    // O - Open/Closed Principle
    // L - Liskov Substitution Principle
    // I - Interface Segregation Principle
    // D - Dependency Inversion Principle

    const gyms = await this.gymsRepositoroy.searchManyByQuery(query,page);

    return { 
      gyms,
    }
  }
}

