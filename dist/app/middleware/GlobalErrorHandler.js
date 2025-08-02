"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleDuplicate_1 = require("../helper/handleDuplicate");
const handleCastError_1 = require("../helper/handleCastError");
const handleValidationError_1 = require("../helper/handleValidationError");
const handleZodError_1 = require("../helper/handleZodError");
const AppError_1 = __importDefault(require("../ErrorHelper.ts/AppError"));
const globalErrorHandler = (error, req, res, next) => {
    if (env_1.envVariable.NODE_ENV === "development") {
        console.log(error);
    }
    let errorSources = [];
    let statusCode = 500;
    let message = `Something Went Wrong ${error.message}`;
    if (error.code === 11000) {
        const simplyError = (0, handleDuplicate_1.handleDuplicateError)(error);
        statusCode = simplyError.statusCode;
        message = simplyError.message;
    }
    else if (error.name === "CastError") {
        const simplifyError = (0, handleCastError_1.handleCastError)(error);
        (statusCode = simplifyError.statusCode), (message = simplifyError.message);
    }
    else if (error.name === "ValidationError") {
        const simplifyError = (0, handleValidationError_1.handleValidationError)(error);
        (statusCode = simplifyError.statusCode),
            (errorSources = simplifyError.errorSources),
            (message = simplifyError.message);
    }
    else if (error.name === "ZodError") {
        const simplifyError = (0, handleZodError_1.hanldeZodError)(error);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorSources = simplifyError.errorSources;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        (statusCode = statusCode), (message = error.message);
    }
    res.status(statusCode).json({
        message,
        success: false,
        errorSources,
        error: env_1.envVariable.NODE_ENV === "development" ? error : null,
        stack: env_1.envVariable.NODE_ENV === "development" ? error.stack : null,
    });
    next();
};
exports.globalErrorHandler = globalErrorHandler;
