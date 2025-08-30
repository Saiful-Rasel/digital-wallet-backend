"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const ValidateREquest_1 = require("../../utils/ValidateREquest");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("./user.interface");
const agent_controller_1 = require("../agent/agent.controller");
const router = (0, express_1.Router)();
router.post('/register', (0, ValidateREquest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.userController.createUser);
router.get('/all-user', (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.AGENT, user_interface_1.UserRole.USER), user_controller_1.userController.getAllUser);
router.patch('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.USER), user_controller_1.userController.updateUser);
router.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER, user_interface_1.UserRole.AGENT, user_interface_1.UserRole.ADMIN), user_controller_1.userController.getMe);
// created by admin user to agent 
router.patch("/convert-to-agent/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), agent_controller_1.agentcontroller.createUserToAgent);
exports.userRoutes = router;
