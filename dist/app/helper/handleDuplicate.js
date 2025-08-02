"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (error) => {
    const match = error.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${match[1]} already exist`,
        errorSources: [],
    };
};
exports.handleDuplicateError = handleDuplicateError;
