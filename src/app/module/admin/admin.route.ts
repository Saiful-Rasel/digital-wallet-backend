import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { adminController } from "./admin.controller";

const router = Router()

router.get('/users',checkAuth(UserRole.ADMIN),adminController.adminViewAllUser)
router.get('/agents',checkAuth(UserRole.ADMIN),adminController.adminViewAllAgent)
router.get('/transactions',checkAuth(UserRole.ADMIN),adminController.adminViewAllTransaction)
router.patch('/suspend/:id',checkAuth(UserRole.ADMIN),adminController.suspendAgent)
router.patch("/approve/:id", adminController.approveAgent)
router.patch('/block/:id',checkAuth(UserRole.ADMIN),adminController.blockWallet)
router.patch('/unblock/:id',checkAuth(UserRole.ADMIN),adminController.unblockWallet)

export const adminRoutes = router