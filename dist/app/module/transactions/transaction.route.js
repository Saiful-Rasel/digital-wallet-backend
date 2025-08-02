"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const user_interface_1 = require("../user/user.interface");
const checkAuth_1 = require("../../middleware/checkAuth");
const router = express_1.default.Router();
router.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER, user_interface_1.UserRole.AGENT), transaction_controller_1.transactionController.getMyTransactionHistory);
exports.transactionRoutes = router;
