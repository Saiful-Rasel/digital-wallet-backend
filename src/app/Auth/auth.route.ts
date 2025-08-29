import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router()

router.use('/login',authControllers.creadentialLogin)
router.use('/logOut',authControllers.logOut)

export const authRoutes = router