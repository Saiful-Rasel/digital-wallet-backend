"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hanldeZodError = void 0;
const hanldeZodError = (error) => {
    const errorSources = [];
    error.issues.forEach((issue) => errorSources.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return {
        statusCode: 400,
        message: "zod Error",
        errorSources,
    };
};
exports.hanldeZodError = hanldeZodError;
