import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import httpStatus, { status } from "http-status";
import { authServices } from "./auth.service";
import AppError from "../ErrorHelper.ts/AppError";
import { envVariable } from "../config/env";
import { generateToken } from "../utils/jwt";

const creadentialLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await authServices.creadentialLogin(req.body);

  res.cookie("accessToken", loginInfo.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user loggedIn Successfully",
    data: loginInfo,
  });
});

const callbackUrl = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User Not Found");
  }
  const token = generateToken(user, envVariable.JWT_SECRET as string, "1d");
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.redirect(envVariable.FRONTEND_URL);
});

const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Logged out successfully",
    data: [],
  });
});

export const authControllers = {
  creadentialLogin,
  logOut,
  callbackUrl,
};
