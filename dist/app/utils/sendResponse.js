"use strict";
//   sendResponse(res,{
//     statusCode:httpStatus.CREATED,
//     success:true,
//     message:"user created successfully",
//     data:user,
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        statuscode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
