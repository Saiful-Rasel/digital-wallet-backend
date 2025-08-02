import { NextFunction, Request, Response } from "express";
import { envVariable } from "../config/env";

type asyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync = (fn: asyncHandler) => (req: Request, res: Response,next:NextFunction) => {
    Promise.resolve(fn(req,res,next)).catch((error) => {
        if(envVariable.NODE_ENV === "development"){
            console.log(error)
        }
        next(error)
    })
};
