import { Router } from "express";
import { authControllers } from "./auth.controller";
import passport from "passport";

const router = Router()

router.post('/login',authControllers.creadentialLogin)
router.post('/logOut',authControllers.logOut)
router.get("/google", passport.authenticate('google', { scope: ['profile',"email"],prompt: 'consent' }))


router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login'}),authControllers.callbackUrl)

export const authRoutes = router