import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validartion-error";


interface validateCheckInUseCaseRequest{
  checkInId: string;
}

interface validateCheckInUseCaseResponse{
  checkInId: CheckIn;
}



export class validateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,

  ){}

  async execute(
    {
      checkInId
    }: validateCheckInUseCaseRequest
  ): Promise<validateCheckInUseCaseResponse>{
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if(!checkIn){
      throw new ResourceNotFoundError();
    }

    if(checkIn.validated_at){
      throw new Error("Check-in already validated");
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(dayjs(checkIn.createdAt), 'minute');

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError();
    }
    checkIn.validated_at = new Date();



    const validatedCheckIn = await this.checkInsRepository.save(checkIn);

    return {
      checkInId: validatedCheckIn
    }

  }
  
}