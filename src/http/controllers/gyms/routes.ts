import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { searchController } from "./searchController";
import { nearbyController } from "./nearbyController";
import { createGymController } from "./createController";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";


export async function gymsRoutes(app: FastifyInstance){
 app.addHook('onRequest',verifyJWT);

 app.get('/gyms/search',searchController);
 app.get('/gyms/nearby',nearbyController);
 app.post('/gyms',{onRequest:[verifyUserRole('ADMIN')]},createGymController);
}