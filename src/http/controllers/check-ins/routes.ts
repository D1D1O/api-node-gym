import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createCheckInController } from "./createController";
import { validateCheckInController } from "./validateController";
import { historyController } from "./historyController";
import { metricsController } from "./metricsController";


export async function checkInsRoutes(app: FastifyInstance){
 app.addHook('onRequest',verifyJWT);
 
  app.get('/check-ins/history',historyController);
  app.get('/check-ins/metrics',metricsController);
  app.post('/gyms/:gymId/check-ins',createCheckInController);
  app.patch('/check-ins/:checkInId',validateCheckInController);
}