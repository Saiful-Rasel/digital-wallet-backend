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
exports.walletController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const wallet_service_1 = require("./wallet.service");
const depositWallet = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = Number(req.body.balance);
    const userId = req.user.userId;
    const wallet = yield wallet_service_1.walletService.depositWallet(userId, balance);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "deposit money added successfully",
        data: wallet,
    });
}));
const withdrawWallet = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = Number(req.body.balance);
    const userId = req.user.userId;
    const wallet = yield wallet_service_1.walletService.withdrawWallet(userId, balance);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "withdraw money  successfully",
        data: wallet,
    });
}));
const transfer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const balance = Number(req.body.balance);
    const { receiverId } = req.body;
    console.log(receiverId);
    const senderId = req.user.userId;
    const wallet = yield wallet_service_1.walletService.transfer(senderId, receiverId, balance);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "transfer money  successfully",
        data: wallet,
    });
}));
const myHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const wallet = yield wallet_service_1.walletService.myHistory(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "History showed successfully",
        data: wallet,
    });
}));
const getWalletByUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const wallet = yield wallet_service_1.walletService.myHistory(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "History showed successfully",
        data: wallet,
    });
}));
exports.walletController = {
    depositWallet,
    getWalletByUser,
    withdrawWallet,
    transfer,
    myHistory,
};
