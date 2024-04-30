import { FastifyRequest,FastifyReply } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metricsController (req: FastifyRequest, res:FastifyReply){

 const getUserMetricsUseCase = makeGetUserMetricsUseCase();

 const {checkins} =  await getUserMetricsUseCase.execute({
      user_id: req.user.sub
    });

  res.status(200).send({
    checkins
  });

}