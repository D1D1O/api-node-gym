import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest{
  userlatitude: number, 
  userlongitude: number, 
  page: number 
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[] ;
}


export class FetchNearbyGymsUseCase {
  constructor (private gymsRepositoroy: GymsRepository){}

  async execute({ userlatitude, userlongitude, page }:FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
  
  
    // SOLID
    // S - Single Responsibility Principle
    // O - Open/Closed Principle
    // L - Liskov Substitution Principle
    // I - Interface Segregation Principle
    // D - Dependency Inversion Principle

    const gyms = await this.gymsRepositoroy.findManyNearby({
            latitude:userlatitude,
            longitude: userlongitude, 
            page:page
          });

    return { 
      gyms,
    }
  }
}