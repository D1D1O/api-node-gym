import { FastifyRequest,FastifyReply } from "fastify";

export async function refreshController (req: FastifyRequest, res:FastifyReply){
  
  await req.jwtVerify({onlyCookie: true});

  const { role } = req.user;
  
    const token = await res.jwtSign({
      role
    },{sign:{sub: req.user.sub,}});

    const refreshToken = await res.jwtSign(
    {
      role
    },
    {
      sign:{
        sub: req.user.sub,
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

}