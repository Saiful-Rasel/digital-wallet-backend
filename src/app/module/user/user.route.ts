import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../utils/ValidateREquest";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";
import { agentcontroller } from "../agent/agent.controller";

const router = Router()

router.post('/register',validateRequest(createUserZodSchema),userController.createUser)
router.get('/all-user',checkAuth(UserRole.ADMIN),userController.getAllUser)
router.patch('/:id',checkAuth(UserRole.ADMIN,UserRole.USER),userController.updateUser)

// created by admin user to agent 
router.patch("/convert-to-agent/:id",checkAuth(UserRole.ADMIN),agentcontroller.createUserToAgent)

export const userRoutes = router