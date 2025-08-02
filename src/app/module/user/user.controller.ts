import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const User = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user created Successfully",
    data: User
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {

  const allUser = await userService.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "all user found successfully",
    data: allUser
  });
});



const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
 const userId = req.params.id


const verifiedToken = req.user
 const payload = req.body
 const user = await userService.updateUser(userId,payload,verifiedToken as JwtPayload)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"user updated successfully",
     data:user
  })
})
export const userController = {
  createUser,
  getAllUser,
  updateUser
};
