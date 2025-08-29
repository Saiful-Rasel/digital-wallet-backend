import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";

const creadentialLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await authServices.creadentialLogin(req.body);

  res.cookie("accessToken", loginInfo.accessToken, {
    httpOnly: true,
    secure: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user loggedIn Successfully",
    data: loginInfo,
  });
});

const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
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
};
