import { Gym, Prisma } from "@prisma/client";

export interface findManyNearby {
    latitude: number;
    longitude: number;
    page: number;
}

export interface GymsRepository {
    
    findById(id: string): Promise<Gym | null>;
    //create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>;
    create(data: Prisma.GymCreateInput): Promise<Gym>;
    findManyNearby(params:findManyNearby): Promise<Gym[] >;
    searchManyByQuery(name: string, page: number): Promise<Gym[] >;
}