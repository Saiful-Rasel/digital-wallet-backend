import AppError from "../ErrorHelper.ts/AppError";
import { IUser } from "../module/user/user.interface";
import { User } from "../module/user/user.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envVariable } from "../config/env";
import { generateToken } from "../utils/jwt";

const creadentialLogin = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.CREATED, "User Not Found");
  }
  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password Not Matched");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = await generateToken(
    jwtPayload,
    envVariable.JWT_SECRET as string,
    "1d"
  );

  return {
    accessToken,
  };
};

export const authServices = {
  creadentialLogin,
};
