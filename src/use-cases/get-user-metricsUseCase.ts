
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UsersRepositoroy } from "@/repositories/users-repository";
import { CheckIn, User } from "@prisma/client";

interface GetUserMetricsUseCAseRequest {
  user_id: string;
}

interface GetUserMetricsUseCAseResponse {
  checkins: CheckIn[];
}

export class GetUserMetricsUseCase {
  constructor (private checkInsRepositoroy: CheckInsRepository){}

  async execute({ user_id }:GetUserMetricsUseCAseRequest): Promise<GetUserMetricsUseCAseResponse> {
    //obter o numero de check ins realizado pelo usuario
    // SOLID
    // S - Single Responsibility Principle
    // O - Open/Closed Principle
    // L - Liskov Substitution Principle
    // I - Interface Segregation Principle
    // D - Dependency Inversion Principle

    const checkins = await this.checkInsRepositoroy.getCheckIns(user_id);
  
    return { 
      checkins
    }
  }
}

