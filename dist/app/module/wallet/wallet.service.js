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
exports.walletService = void 0;
const AppError_1 = __importDefault(require("../../ErrorHelper.ts/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const wallet_model_1 = require("./wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_service_1 = require("../transactions/transaction.service");
const depositWallet = (userId, balance) => __awaiter(void 0, void 0, void 0, function* () {
    if (balance <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid deposit amount");
    }
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if (!wallet) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "wallet not found");
    }
    if (wallet.isBlocked) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Wallet is blocked");
    }
    wallet.balance += balance;
    const data = yield wallet.save();
    const transactionPayload = {
        sender: userId,
        receiver: userId,
        balance,
        type: "transfer",
        status: "completed",
    };
    yield transaction_service_1.transactionService.createTransaction(transactionPayload);
    return data;
});
const withdrawWallet = (userId, balance) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if ((wallet === null || wallet === void 0 ? void 0 : wallet.balance) < balance) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "insufficient amount");
    }
    if (!wallet) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "wallet not found");
    }
    if (wallet.isBlocked) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Wallet is blocked");
    }
    wallet.balance -= balance;
    const data = yield wallet.save();
    const transactionPayload = {
        sender: userId,
        receiver: userId,
        balance,
        type: "withdraw",
        status: "completed",
    };
    yield transaction_service_1.transactionService.createTransaction(transactionPayload);
    return data;
});
const transfer = (senderId, receiverId, balance) => __awaiter(void 0, void 0, void 0, function* () {
    if (balance <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid deposit amount");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const senderWallet = yield wallet_model_1.Wallet.findOne({ user: senderId });
        const receiverWallet = yield wallet_model_1.Wallet.findOne({ user: receiverId });
        if (!senderWallet || !receiverWallet) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Sender or Receiver wallet not found");
        }
        if (senderWallet.isBlocked || receiverWallet.isBlocked) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "One of the wallets is blocked");
        }
        if (senderWallet.balance < balance) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient balance");
        }
        senderWallet.balance -= balance;
        receiverWallet.balance += balance;
        yield senderWallet.save();
        yield receiverWallet.save();
        const transactionPayload = {
            sender: senderId,
            receiver: receiverId,
            balance,
            type: "transfer",
            status: "completed",
        };
        yield transaction_service_1.transactionService.createTransaction(transactionPayload);
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const myHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId }).populate("user", "name email");
    if (!wallet)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wallet not found");
    return wallet;
});
const getWalletByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if (!wallet)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wallet not found");
    return wallet;
});
exports.walletService = {
    depositWallet,
    getWalletByUser,
    withdrawWallet,
    transfer,
    myHistory,
};
