import { FastifyRequest,FastifyReply } from "fastify";
import { number, z } from "zod";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function createCheckInController (req: FastifyRequest, res:FastifyReply){
  
  const createCheckInBodySchema = z.object({

    latitude: z.string(),
    longitude: z.string()
  });

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  });


  const { latitude,longitude } = createCheckInBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
      userId:req.user.sub,
      gymId:gymId, 
      userLatitude:Number(latitude), 
      userLongitude:Number(longitude)
  });
  
  res.status(201).send();

}