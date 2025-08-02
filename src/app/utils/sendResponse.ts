//   sendResponse(res,{
//     statusCode:httpStatus.CREATED,
//     success:true,
//     message:"user created successfully",
//     data:user,

import { Response } from "express";

//    })

export interface Trespone<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const sendResponse = <T>(res: Response, data: Trespone<T>) => {
  res.status(data.statusCode).json({
    statuscode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
