import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { walletService } from "./wallet.service";


const depositWallet = catchAsync(async (req: Request, res: Response) => {
  const balance = Number(req.body.balance);
  const userId = req.user.userId;
  const wallet = await walletService.depositWallet(userId, balance);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "deposit money added successfully",
    data: wallet,
  });
});

const withdrawWallet = catchAsync(async (req: Request, res: Response) => {
  const balance = Number(req.body.balance);
  const userId = req.user.userId;
  const wallet = await walletService.withdrawWallet(userId, balance);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "withdraw money  successfully",
    data: wallet,
  });
});

const transfer = catchAsync(async (req: Request, res: Response) => {
  const balance = Number(req.body.balance);
  const { receiverId } = req.body;
  console.log(receiverId);
  const senderId = req.user.userId;
  const wallet = await walletService.transfer(senderId, receiverId, balance);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "transfer money  successfully",
    data: wallet,
  });
});

const myHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const wallet = await walletService.myHistory(userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "History showed successfully",
    data: wallet,
  });
});

const getWalletByUser = catchAsync(async (req: Request, res: Response) => {
  const {userId} = req.params;
  const wallet = await walletService.myHistory(userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "History showed successfully",
    data: wallet,
  });
});

export const walletController = {
  depositWallet,
  getWalletByUser,
  withdrawWallet,
  transfer,
  myHistory,
};
