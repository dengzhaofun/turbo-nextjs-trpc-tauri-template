import { TRPCError } from "@trpc/server";
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const verifyJwt = <T>(
  token: string,
  secret: string,
): JwtPayload |null => {
  try {
    return jwt.verify(token, secret) as JwtPayload; 
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const authMiddleware = (opts: any) => {
  const { ctx } = opts;
  const authorization = ctx.req.headers.authorization;

  if (!authorization) {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  const result = verifyJwt(authorization, process.env.JWT_SECRET || '');
  if (!result) {
    throw new TRPCError({code: "UNAUTHORIZED", cause: "Invalid JWT token"});
  }
  return opts.next({ctx: {
    user: {uid: result.sub, role: result.role},
  }})
};
