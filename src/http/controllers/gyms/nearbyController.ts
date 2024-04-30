import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { makeFetchNearByGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearbyController (req: FastifyRequest, res:FastifyReply){
  const nearbyGymsQueryQuerySchema = z.object({

    latitude: z.coerce.number().refine((value)=> {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value)=> {
      return Math.abs(value) <= 180;
    }),
  });

  const {latitude,longitude } = nearbyGymsQueryQuerySchema.parse(req.query);
  const searchGymUseCase = makeFetchNearByGymsUseCase();

 const {gyms} =  await searchGymUseCase.execute({
      userlatitude: latitude,
      userlongitude: longitude,
      page: 1
    });

  res.status(200).send({
    gyms
  });

}