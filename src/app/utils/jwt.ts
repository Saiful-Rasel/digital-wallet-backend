import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";


export const generateToken = async (payload: JwtPayload,secret:string,expiresIn:string) => {
  const Token = await jwt.sign(payload, secret, {
    expiresIn
  } as SignOptions);
  return Token
};

export const verifyToken = async (accessToken :string,secret:string) =>{
    const verifiedToken = await jwt.verify(accessToken,secret)
    return verifiedToken
}
