import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { userController } from "../user/user.controller";
import { walletController } from "./wallet.controller";


const router = Router()

router.post('/deposit',checkAuth(UserRole.USER),walletController.depositWallet)
router.post('/withdraw',checkAuth(UserRole.USER),walletController.withdrawWallet)
router.post("/transfer", checkAuth(UserRole.USER), walletController.transfer);
router.get("/me", checkAuth(UserRole.USER,UserRole.AGENT), walletController.myHistory);
router.get("/user/:userId", checkAuth(UserRole.ADMIN), walletController.getWalletByUser);

export const walletRoutes = router