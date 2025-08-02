import AppError from "../../ErrorHelper.ts/AppError";
import httpStatus from "http-status";
import { Wallet } from "./wallet.model";
import mongoose from "mongoose";
import { transactionService } from "../transactions/transaction.service";
import { ITransaction } from "../transactions/transaction.interface";



const depositWallet = async (userId: string, balance: number) => {
  if (balance <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid deposit amount");
  }
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "wallet not found");
  }
  if (wallet.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "Wallet is blocked");
  }
  wallet.balance += balance;
  const data = await wallet.save();

  const transactionPayload: Partial<ITransaction> = {
    sender: userId,
    receiver: userId,
    balance,
    type: "transfer",
    status: "completed",
  };

  await transactionService.createTransaction(transactionPayload);
  return data;
};

const withdrawWallet = async (userId: string, balance: number) => {
  const wallet = await Wallet.findOne({ user: userId });
  if ((wallet?.balance as number) < balance) {
    throw new AppError(httpStatus.BAD_REQUEST, "insufficient amount");
  }
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "wallet not found");
  }
  if (wallet.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "Wallet is blocked");
  }
  wallet.balance -= balance;
  const data = await wallet.save();
  const transactionPayload: Partial<ITransaction> = {
    sender: userId,
    receiver: userId,
    balance,
    type: "withdraw",
    status: "completed",
  };

  await transactionService.createTransaction(transactionPayload);
  return data
};

const transfer = async (
  senderId: string,
  receiverId: string,
  balance: number
) => {
  if (balance <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid deposit amount");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderWallet = await Wallet.findOne({ user: senderId });
    const receiverWallet = await Wallet.findOne({ user: receiverId });

    if (!senderWallet || !receiverWallet) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Sender or Receiver wallet not found"
      );
    }
    if (senderWallet.isBlocked || receiverWallet.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, "One of the wallets is blocked");
    }
    if (senderWallet.balance < balance) {
      throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
    }
    senderWallet.balance -= balance;
    receiverWallet.balance += balance;

    await senderWallet.save();
    await receiverWallet.save();

    const transactionPayload: Partial<ITransaction> = {
      sender: senderId,
      receiver: receiverId,
      balance,
      type: "transfer",
      status: "completed",
    };

    await transactionService.createTransaction(transactionPayload);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const myHistory = async (userId: string) => {
  const wallet = await Wallet.findOne({ user: userId }).populate('user', 'name email');
  if (!wallet) throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  return wallet;
};

export const walletService = {
  depositWallet,

  withdrawWallet,
  transfer,
  myHistory
};
