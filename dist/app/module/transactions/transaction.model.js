"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        min: 0,
    },
    type: {
        type: String,
        enum: [
            "deposit",
            "withdraw",
            "transfer",
            "agent-cash-in",
            "agent-cash-out",
        ],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "reversed"],
        default: "pending",
    },
    fee: {
        type: Number,
        default: 0,
    },
    commission: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
