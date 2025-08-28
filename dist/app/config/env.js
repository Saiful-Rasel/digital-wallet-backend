"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariable = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.envVariable = {
    port: process.env.PORT,
    uri: process.env.URI,
    bcrypt_Salt_round: process.env.BCRYPT_SALT_ROUND,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN: process.env.ADMIN,
    ADMIN_PASSWORD: process.env.PASSWORD
};
