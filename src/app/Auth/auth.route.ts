import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router()

router.use('/login',authControllers.creadentialLogin)

export const authRoutes = router