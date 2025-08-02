"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../Auth/auth.route");
const wallet_route_1 = require("../module/wallet/wallet.route");
const transaction_route_1 = require("../module/transactions/transaction.route");
const agent_route_1 = require("../module/agent/agent.route");
const admin_route_1 = require("../module/admin/admin.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.userRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes
    },
    {
        path: "/wallet",
        route: wallet_route_1.walletRoutes
    },
    {
        path: "/transaction",
        route: transaction_route_1.transactionRoutes
    },
    {
        path: "/agent",
        route: agent_route_1.agentRoutes
    },
    {
        path: "/admin",
        route: admin_route_1.adminRoutes
    },
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.route);
});
