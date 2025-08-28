"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodSchema = exports.UserRoleEnum = void 0;
const zod_1 = require("zod");
exports.UserRoleEnum = zod_1.z.enum(["ADMIN", "USER", "AGENT"]);
const authProviderSchema = zod_1.z.object({
    provider: zod_1.z.string().min(1, "Provider is required"),
    providerId: zod_1.z.string().min(1, "Provider ID is required"),
});
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    phoneNumber: zod_1.z.string().optional(),
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    isBlocked: zod_1.z.boolean().optional(),
    isApproved: zod_1.z.boolean().optional(),
    picture: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    auth: zod_1.z.array(authProviderSchema).optional(),
});
