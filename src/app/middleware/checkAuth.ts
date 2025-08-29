import { NextFunction, Request, Response } from "express";
import AppError from "../ErrorHelper.ts/AppError";
import { verifyToken } from "../utils/jwt";
import { envVariable } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../module/user/user.model";
import httpStatus from "http-status";
import { isActive } from "../module/user/user.interface";

export const checkAuth =
  (...UserRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization  || req.cookies.accessToken;
      if (!accessToken) {
        throw new AppError(403, "No token received");
      }
      console.log(accessToken)
      const verifiedToken = (await verifyToken(
        accessToken,
        envVariable.JWT_SECRET as string
      )) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });
  console.log(isUserExist)
      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email Doesnot Exist");
      }
      if (
        isUserExist.isActive === isActive.BLOCKED ||
        isUserExist.isActive === isActive.INACTIVE
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `user is ${isUserExist.isActive}`
        );
      }
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "user is deleted");
      }
      if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "user is not verified");
      }
      if (!verifiedToken) {
        throw new AppError(403, "You are not authorized");
      }
      if (!UserRole.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!");
      }
      req.user = verifiedToken
      next();
    } catch (error) {
      next(error);
    }
  };
