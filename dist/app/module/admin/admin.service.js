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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const transaction_model_1 = require("../transactions/transaction.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const wallet_model_1 = require("../wallet/wallet.model");
const adminViewAllUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_model_1.User.find({
        _id: { $ne: userId },
        role: { $nin: ["ADMIN", "AGENT"] },
    });
    return allUser;
});
const adminViewAllAgent = () => __awaiter(void 0, void 0, void 0, function* () {
    const allagent = yield user_model_1.User.find({ role: "AGENT" });
    return allagent;
});
const adminViewAllWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    const allWallet = yield wallet_model_1.Wallet.find().populate("user");
    return allWallet;
});
const adminViewAllTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTransaction = yield transaction_model_1.Transaction.find().populate("sender receiver");
    return allTransaction;
});
const suspendAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateAgent = yield user_model_1.User.findByIdAndUpdate(userId, { role: user_interface_1.UserRole.USER }, { new: true });
    return updateAgent;
});
const approveAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateAgent = yield user_model_1.User.findByIdAndUpdate(userId, { isApproved: true, isActive: user_interface_1.isActive.ACTIVE, isVerified: true, role: user_interface_1.UserRole.AGENT }, { new: true });
    return updateAgent;
});
const blockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, { isBlocked: true }, { new: true });
    return updateWallet;
});
const unBlockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, { isBlocked: false }, { new: true });
    return updateWallet;
});
exports.adminService = {
    adminViewAllUser,
    adminViewAllAgent,
    adminViewAllWallet,
    adminViewAllTransaction,
    suspendAgent,
    blockWallet,
    unBlockWallet,
    approveAgent,
};
