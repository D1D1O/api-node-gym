import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRepository, findManyNearby } from "../gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class inMemoryGymsRepository implements GymsRepository {

  public items: Gym[] = [];

  async findById(id: string){
    const gym = this.items.find((item) => item.id === id);

    if(!gym) {
      return null;
    }
    return gym;
  }
  async create(data: Prisma.GymCreateInput) {
    
    const gym = {
      id: data.id || randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      photo: data.photo,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym);
    return gym;
  }

  async searchManyByQuery(name: string, page: number){
    // const gym = this.items
    //   .filter((item) => item.title.toLocaleUpperCase() === name.toLocaleUpperCase() )
    //   .slice((page -1 ) * 20, page * 20);

    const gym = this.items
      .filter((item) => item.title.toUpperCase().includes(name.toUpperCase()))
      .slice((page -1 ) * 20, page * 20);

  
    return gym;
  }
  
  async findManyNearby(params: findManyNearby ){
    const gym = this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: item.latitude.toNumber(),
            longitude: item.longitude.toNumber(),
          }          
        )
        console.log(distance);
        return distance <= 10;

      })
      .slice((params.page -1 ) * 20, params.page * 20);

    return gym;
  }
}