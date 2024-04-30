import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticateUseCase";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-errors";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticateController (req: FastifyRequest, res:FastifyReply){
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

 try {

    const authenticateUseCase = makeAuthenticateUseCase(); 

    const {user}= await authenticateUseCase.execute({ email, password});

    const token = await res.jwtSign({
      role: user.role,
    },
    {
      sign:{sub: user.id}
    }
    );

    const refreshToken = await res.jwtSign(
    {
      role: user.role,
    },
    {
      sign:{
        sub: user.id,
        expiresIn: '7d'
      }
    });


    res
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,   
      httpOnly: true,
    })
    .status(200).send({token});

  } catch (error) {
    
    if(error instanceof InvalidCredentialsError){
      return res.status(409).send({error: error.message});
    }

    return res.status(500).send({error: "Internal Server Error"}); //TODO:  fix me
  }


}