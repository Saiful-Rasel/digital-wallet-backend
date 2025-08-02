import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
