import mongoose from "mongoose";
import { TGenericErrorResponse } from "./handleDuplicate";


export const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid Mongodb Object Id , Please provide valid Id",
    
  };
};