import { Router } from "express";

import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { agentcontroller } from "./agent.controller";

const router = Router();

router.post( "/cash-out", checkAuth(UserRole.AGENT),agentcontroller.agentCashOut);
router.post("/cash-in", checkAuth(UserRole.AGENT), agentcontroller.agentCashIn);
export const agentRoutes = router;
