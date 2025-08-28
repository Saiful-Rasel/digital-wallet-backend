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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_interface_1 = require("./user.interface");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../ErrorHelper.ts/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
const wallet_model_1 = require("../wallet/wallet.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
        const isUserExist = yield user_model_1.User.findOne({ email }).session(session);
        if (isUserExist) {
            throw new AppError_1.default(400, "User already exists");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(env_1.envVariable.bcrypt_Salt_round));
        const authProvider = {
            provider: "Creadential",
            providerId: email,
        };
        const user = yield user_model_1.User.create([
            Object.assign({ email, password: hashedPassword, auth: authProvider }, rest),
        ], { session });
        yield wallet_model_1.Wallet.create([
            {
                user: user[0]._id,
                balance: 50,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return user[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_model_1.User.find();
    return allUser;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield user_model_1.User.findById(userId);
    if (!ifUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.UserRole.USER || decodedToken.role === user_interface_1.UserRole.AGENT) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "you are not authorized");
        }
    }
    if (payload.role === user_interface_1.UserRole.ADMIN) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "you are not authorized");
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === user_interface_1.UserRole.USER) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "you are not authorized");
        }
    }
    if (decodedToken.role === user_interface_1.UserRole.AGENT && decodedToken.userId !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Agent not authorized to update user");
    }
    if (payload.password) {
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(env_1.envVariable.bcrypt_Salt_round));
    }
    const newUpdatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
exports.userService = {
    createUser,
    getAllUser,
    updateUser
};
