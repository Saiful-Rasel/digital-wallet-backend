import express from "express";
import { transactionController } from "./transaction.controller";

import { UserRole } from "../user/user.interface";
import { checkAuth } from "../../middleware/checkAuth";

const router = express.Router();

router.get("/me",checkAuth(UserRole.USER, UserRole.AGENT), transactionController.getMyTransactionHistory);


export const transactionRoutes = router;
