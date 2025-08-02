import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { agentService } from "./agent.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'

const createUserToAgent = catchAsync(async(req:Request,res:Response) =>{
    const userId = req.params.id
   

    const agent = await  agentService.createUserToAgent (userId)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "agent created Successfully",
        data: agent
      });
})


const agentCashOut = catchAsync(async (req: Request, res: Response) => {
  const agentId = req.user.userId;
  
  const { userId, balance } = req.body;

  const result = await agentService.cashOutFromUser(agentId, userId, Number(balance));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cash-out completed successfully",
    data: result,
  });
});


const agentCashIn = catchAsync(async (req: Request, res: Response) => {
  const agentId = req.user.userId;
  const { userId, balance } = req.body;

  const result = await agentService.cashInToUser(agentId, userId, Number(balance));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cash-in successful",
    data: result,
  });
});



export const agentcontroller = {
    createUserToAgent,
    agentCashOut,
    agentCashIn
}