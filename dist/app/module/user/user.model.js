"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, {
    versionKey: false,
    _id: false,
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
        type: String,
        enum: Object.values(user_interface_1.UserRole),
        default: user_interface_1.UserRole.USER,
    },
    isBlocked: { type: Boolean },
    isApproved: { type: Boolean, default: false },
    picture: { type: String },
    address: { type: String },
    auth: [authProviderSchema],
    isVerified: { type: Boolean, default: true },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.isActive),
        default: user_interface_1.isActive.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
