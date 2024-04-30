import { FetchNearbyGymsUseCase } from "../fetch-nearby-gymsUseCase";
import { SearchGymsUseCase } from "../search-gymsUseCase";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearByGymsUseCase() {
  
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
