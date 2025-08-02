import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
import { authRoutes } from "../Auth/auth.route";
import { walletRoutes } from "../module/wallet/wallet.route";
import { transactionRoutes } from "../module/transactions/transaction.route";
import { agentRoutes } from "../module/agent/agent.route";
import { adminRoutes } from "../module/admin/admin.route";

export const router = Router()

const moduleRoutes = [
    {
        path:"/user",
        route:userRoutes
    },
      {
        path:"/auth",
        route:authRoutes
    },
     {
        path:"/wallet",
        route:walletRoutes
    },
     {
        path:"/transaction",
        route:transactionRoutes
    },
      {
        path:"/agent",
        route:agentRoutes
    },
     {
        path:"/admin",
        route:adminRoutes
    },
]

moduleRoutes.forEach(route => {
    router.use(route.path,route.route)
});