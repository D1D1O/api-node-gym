import { FastifyInstance } from "fastify";
import { registerController } from "./registerController";
import { authenticateController } from "./authenticateController";
import { profileController } from "./profileController";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refreshController } from "./refreshController";

export async function usersRoutes(app: FastifyInstance){
  app.post('/user', registerController);
  app.post('/sessions', authenticateController);

  app.patch('/token/refresh',refreshController)
  //app.get('/me',profileController);
  app.get('/me',{onRequest:[verifyJWT]} ,profileController);
}