
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UsersRepositoroy } from "@/repositories/users-repository";
import { CheckIn, User } from "@prisma/client";

interface GetUserMetricsLoginUseCaseRequest {
  user_id: string;
}

interface GetUserMetricsLoginUseCaseResponse {
  checkins: number;
}

export class GetUserMetricsLoginUseCase {
  constructor (private checkInsRepositoroy: CheckInsRepository){}

  async execute({ user_id }:GetUserMetricsLoginUseCaseRequest): Promise<GetUserMetricsLoginUseCaseResponse> {
    //obter o numero de check ins realizado pelo usuario
    // SOLID
    // S - Single Responsibility Principle
    // O - Open/Closed Principle
    // L - Liskov Substitution Principle
    // I - Interface Segregation Principle
    // D - Dependency Inversion Principle

    const checkins = await this.checkInsRepositoroy.countByUserId(user_id);
  
    return { 
      checkins
    }
  }
}

