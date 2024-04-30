import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
  title: string;
  description: string;
  phone: string;
  photo: string;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor (private gymsRepositoroy: GymsRepository){}

  async execute({ 
    title,
    description,
    phone,
    photo,
    latitude,
    longitude

  }:CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
  
    // SOLID
    // S - Single Responsibility Principle
    // O - Open/Closed Principle
    // L - Liskov Substitution Principle
    // I - Interface Segregation Principle
    // D - Dependency Inversion Principle
  
    const gym = await this.gymsRepositoroy.create({
      title,
      description,
      phone,
      photo,
      latitude,
      longitude
    });

    return { 
      gym
    }
  }
}

