import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const adminViewAllUser = catchAsync(async (req: Request, res: Response) => {
  const allUser = await adminService.adminViewAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all user Successfully",
    data: allUser,
  });
});

const adminViewAllAgent = catchAsync(async (req: Request, res: Response) => {
  const allagent = await adminService.adminViewAllAgent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all agent retrieve Successfully",
    data: allagent,
  });
});

const adminViewAllWallet = catchAsync(async (req: Request, res: Response) => {
  const allWallet = await adminService.adminViewAllWallet();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all wallet retrieve Successfully",
    data: allWallet,
  });
});

const adminViewAllTransaction = catchAsync(
  async (req: Request, res: Response) => {
    const allTransaction = await adminService.adminViewAllTransaction();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "all transaction retrieve Successfully",
      data: allTransaction,
    });
  }
);

// i give approved when the user make to agent
const suspendAgent = catchAsync(async (req: Request, res: Response) => {
  const agentId = req.params.id;

  const suspendAgent = await adminService.suspendAgent(agentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "suspend agent Successfully",
    data: suspendAgent,
  });
});
const approveAgent = catchAsync(async (req: Request, res: Response) => {
  const agentId = req.params.id;

  const approveAgent = await adminService.approveAgent(agentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "approved agent Successfully",
    data: approveAgent,
  });
});

const blockWallet = catchAsync(async (req: Request, res: Response) => {
  const walletId = req.params.id;

  const blockWallet = await adminService.blockWallet(walletId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user block Successfully",
    data: blockWallet,
  });
});
const unblockWallet = catchAsync(async (req: Request, res: Response) => {
    const walletId = req.params.id;

  const unBlockWallet = await adminService.blockWallet(walletId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user unblock Successfully",
    data: unBlockWallet,
  });
});

export const adminController = {
  adminViewAllUser,
  adminViewAllAgent,
  adminViewAllWallet,
  adminViewAllTransaction,
  suspendAgent,
  blockWallet,
  unblockWallet,
  approveAgent
};
