import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";

const creadentialLogin = catchAsync(async (req: Request, res: Response) => {

    
    const loginInfo = await authServices.creadentialLogin(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user loggedIn Successfully",
    data: loginInfo
  });
});


export const authControllers = {
    creadentialLogin
}