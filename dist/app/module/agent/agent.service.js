"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentService = void 0;
const AppError_1 = __importDefault(require("../../ErrorHelper.ts/AppError"));
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const wallet_model_1 = require("../wallet/wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_model_1 = require("../transactions/transaction.model");
const createUserToAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "user not found");
    }
    if ((isUserExist.role === user_interface_1.UserRole.AGENT)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Already an agent");
    }
    isUserExist.role = user_interface_1.UserRole.AGENT;
    isUserExist.isApproved = true;
    isUserExist.isActive = user_interface_1.isActive.ACTIVE;
    yield isUserExist.save();
    return isUserExist;
});
const cashOutFromUser = (userId, agentId, balance) => __awaiter(void 0, void 0, void 0, function* () {
    if (balance <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Amount must be greater than 0");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.User.findById(userId).session(session);
        const agent = yield user_model_1.User.findById(agentId).session(session);
        if (!user || !agent) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User or Agent not found");
        }
        if (user.isActive !== "ACTIVE") {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is not active");
        }
        const userWallet = yield wallet_model_1.Wallet.findOne({ user: userId }).session(session);
        const agentWallet = yield wallet_model_1.Wallet.findOne({ user: agentId }).session(session);
        if (!userWallet || !agentWallet) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wallet not found");
        }
        if (userWallet.balance < balance) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User has insufficient balance");
        }
        userWallet.balance -= balance;
        agentWallet.balance += balance;
        yield userWallet.save({ session });
        yield agentWallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                sender: userId,
                receiver: agentId,
                balance: balance,
                type: "agent-cash-out",
                status: "completed",
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return { userWallet, agentWallet };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const cashInToUser = (agentId, userId, balance) => __awaiter(void 0, void 0, void 0, function* () {
    if (balance <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Amount must be greater than 0");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.User.findById(userId).session(session);
        const agent = yield user_model_1.User.findById(agentId).session(session);
        if (!user || !agent) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User or Agent not found");
        }
        const userWallet = yield wallet_model_1.Wallet.findOne({ user: userId }).session(session);
        const agentWallet = yield wallet_model_1.Wallet.findOne({ user: agentId }).session(session);
        if (!userWallet || !agentWallet) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wallet not found");
        }
        if (agentWallet.balance < balance) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Agent has insufficient balance");
        }
        agentWallet.balance -= balance;
        userWallet.balance += balance;
        yield agentWallet.save({ session });
        yield userWallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                sender: agentId,
                receiver: userId,
                balance: balance,
                type: "agent-cash-in",
                status: "completed",
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return { userWallet, agentWallet };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.agentService = {
    createUserToAgent,
    cashOutFromUser,
    cashInToUser
};
