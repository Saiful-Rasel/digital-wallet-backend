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
exports.seedAdmin = void 0;
const env_1 = require("../config/env");
const user_model_1 = require("../module/user/user.model");
const user_interface_1 = require("../module/user/user.interface");
const bcrypt_1 = __importDefault(require("bcrypt"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserExist = yield user_model_1.User.findOne({
            email: env_1.envVariable.ADMIN,
        });
        if (isUserExist) {
            console.log(" admin already exist");
            return;
        }
        const authProvider = {
            provider: "Creadential",
            providerId: env_1.envVariable.ADMIN,
        };
        const hashedPassword = yield bcrypt_1.default.hash(env_1.envVariable.ADMIN_PASSWORD, Number(env_1.envVariable.bcrypt_Salt_round));
        const admin = {
            name: "admin",
            email: env_1.envVariable.ADMIN,
            role: user_interface_1.UserRole.ADMIN,
            isVerified: true,
            auth: [authProvider],
            password: hashedPassword,
        };
        const createAdmin = yield user_model_1.User.create(admin);
    }
    catch (error) {
        console.log("from seedadmin", error);
    }
});
exports.seedAdmin = seedAdmin;
