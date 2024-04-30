import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function searchController (req: FastifyRequest, res:FastifyReply){
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q,page } = searchGymsQuerySchema.parse(req.query);

  const searchGymUseCase = makeSearchGymsUseCase();

 const {gyms} =  await searchGymUseCase.execute({
      query: q,
      page
    });

  res.status(200).send({
    gyms
  });

}