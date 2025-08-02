import { NextFunction, Request, Response } from "express";
import { envVariable } from "../config/env";
import { handleDuplicateError } from "../helper/handleDuplicate";
import { handleCastError } from "../helper/handleCastError";
import { handleValidationError } from "../helper/handleValidationError";
import { hanldeZodError } from "../helper/handleZodError";
import AppError from "../ErrorHelper.ts/AppError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVariable.NODE_ENV === "development") {
    console.log(error);
  }
  let errorSources: any = [];
  let statusCode = 500;
  let message = `Something Went Wrong ${error.message}`;
  if (error.code === 11000) {
    const simplyError = handleDuplicateError(error);
    statusCode = simplyError.statusCode;
    message = simplyError.message;
  } else if (error.name === "CastError") {
    const simplifyError = handleCastError(error);
    (statusCode = simplifyError.statusCode), (message = simplifyError.message);
  } else if (error.name === "ValidationError") {
    const simplifyError = handleValidationError(error);
    (statusCode = simplifyError.statusCode),
      (errorSources = simplifyError.errorSources),
      (message = simplifyError.message);
  } else if (error.name === "ZodError") {
    const simplifyError = hanldeZodError(error);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSources = simplifyError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    (statusCode = statusCode), (message = error.message);
  }

  res.status(statusCode).json({
    message,
    success: false,
    errorSources,
    error: envVariable.NODE_ENV === "development" ? error : null,
    stack: envVariable.NODE_ENV === "development" ? error.stack : null,
  });
  next();
};
