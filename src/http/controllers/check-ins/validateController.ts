import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validateCheckInController (req: FastifyRequest, res:FastifyReply){
  
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid()
  });

  const { checkInId } = validateCheckInsParamsSchema.parse(req.params);

  const checkInUseCase = makeValidateCheckInUseCase();

  await checkInUseCase.execute({
    checkInId:checkInId
  });
  
  res.status(204).send();

}