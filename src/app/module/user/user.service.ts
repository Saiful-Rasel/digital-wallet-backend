
import httpStatus from "http-status"
import { IAuthProvider, IUser, UserRole } from "./user.interface";
import mongoose from "mongoose";
import { User } from "./user.model";
import AppError from "../../ErrorHelper.ts/AppError";
import bcrypt from "bcrypt"
import { envVariable } from "../../config/env";
import { Wallet } from "../wallet/wallet.model";
import { JwtPayload } from "jsonwebtoken";



const createUser = async (payload: Partial<IUser>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email }).session(session);
    if (isUserExist) {
      throw new AppError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(
      password as string,
      Number(envVariable.bcrypt_Salt_round)
    );

    const authProvider: IAuthProvider = {
      provider: "Creadential",
      providerId: email as string,
    };

    const user = await User.create(
      [
        {
          email,
          password: hashedPassword,
          auth: authProvider,
          ...rest,
        },
      ],
      { session }
    );

    await Wallet.create(
      [
        {
          user: user[0]._id,
          balance: 50,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return user[0]; 
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
  

const getAllUser = async () => {
  const allUser = await User.find();
  return allUser;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {

  const ifUserExist = await User.findById(userId);
  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (payload.role) {
    if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.AGENT) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
  }

  if (payload.role === UserRole.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if ( decodedToken.role === UserRole.USER) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
  }
  if (decodedToken.role === UserRole.AGENT && decodedToken.userId !== userId) {
  throw new AppError(httpStatus.FORBIDDEN, "Agent not authorized to update user");
}

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(envVariable.bcrypt_Salt_round)
    );
  }
  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};

export const userService = {
  createUser,
  getAllUser,
  updateUser
};
