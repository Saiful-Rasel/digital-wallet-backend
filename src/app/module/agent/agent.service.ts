import AppError from "../../ErrorHelper.ts/AppError";
import { isActive, UserRole } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Wallet } from "../wallet/wallet.model";
import mongoose from "mongoose";
import { Transaction } from "../transactions/transaction.model";

const createUserToAgent = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  if ((isUserExist.role === UserRole.AGENT)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Already an agent");
  }

  isUserExist.role = UserRole.AGENT;
  isUserExist.isApproved = true; 
  isUserExist.isActive = isActive.ACTIVE;
  await isUserExist.save();
  return isUserExist;
};


const cashOutFromUser = async (
  agentId: string,
  userId: string,
  balance: number
) => {
  if (balance <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Amount must be greater than 0");
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    const agent = await User.findById(agentId).session(session);

    if (!user || !agent) {
      throw new AppError(httpStatus.NOT_FOUND, "User or Agent not found");
    }

    if (user.isActive !== "ACTIVE") {
      throw new AppError(httpStatus.BAD_REQUEST, "User is not active");
    }

    const userWallet = await Wallet.findOne({ user: userId }).session(session);
    const agentWallet = await Wallet.findOne({ user: agentId }).session(session);

    if (!userWallet || !agentWallet) {
      throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
    }

    if (userWallet.balance < balance) {
      throw new AppError(httpStatus.BAD_REQUEST, "User has insufficient balance");
    }

    userWallet.balance -= balance;
    agentWallet.balance += balance;

    await userWallet.save({ session });
    await agentWallet.save({ session });

    await Transaction.create(
      [
        {
          sender: userId,
          receiver: agentId,
          balance: balance,
          type: "agent-cash-out",
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { userWallet, agentWallet };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const cashInToUser = async (
  agentId: string,
  userId: string,
  balance: number
) => {
  if (balance <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Amount must be greater than 0");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    const agent = await User.findById(agentId).session(session);

    if (!user || !agent) {
      throw new AppError(httpStatus.NOT_FOUND, "User or Agent not found");
    }

    const userWallet = await Wallet.findOne({ user: userId }).session(session);
    const agentWallet = await Wallet.findOne({ user: agentId }).session(session);

    if (!userWallet || !agentWallet) {
      throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
    }

    if (agentWallet.balance < balance) {
      throw new AppError(httpStatus.BAD_REQUEST, "Agent has insufficient balance");
    }

    agentWallet.balance -= balance;
    userWallet.balance += balance;

    await agentWallet.save({ session });
    await userWallet.save({ session });

   
    await Transaction.create(
      [
        {
          sender: agentId,
          receiver: userId,
          balance: balance,
          type: "agent-cash-in",
          status: "completed",

        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { userWallet, agentWallet };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const agentService = {
  createUserToAgent,
  cashOutFromUser,
  cashInToUser
};
