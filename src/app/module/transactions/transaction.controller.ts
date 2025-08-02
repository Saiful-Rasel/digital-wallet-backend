import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { transactionService } from "./transaction.service";

const getMyTransactionHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const transactions = await transactionService.getUserTransactionHistory(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Transaction history retrieved successfully",
    data: transactions,
  });
});


export const transactionController = {
  getMyTransactionHistory,

};
