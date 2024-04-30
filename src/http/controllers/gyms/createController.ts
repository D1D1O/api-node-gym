import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function createGymController (req: FastifyRequest, res:FastifyReply){
  const createGymsBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value)=> {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value)=> {
      return Math.abs(value) <= 180;
    }),
  });

  const { title,description,phone,latitude,longitude } = createGymsBodySchema.parse(req.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({
        title: title, 
        description: description || '', 
        phone: phone ||'',
        photo:'001.jpg',
        latitude: 
        latitude, 
        longitude: longitude
      });

  // try {

  // } catch (error) {
    
  //   if(error instanceof UserAlreadyExistsError){
  //     return res.status(409).send({error: error.message});
  //   }

  //   return res.status(500).send({error: "Internal Server Error"}); //TODO:  fix me
  // }

  res.status(201).send();

}