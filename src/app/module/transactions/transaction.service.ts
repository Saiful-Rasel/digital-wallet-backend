import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const createTransaction = async (payload: Partial<ITransaction>) => {
  const transaction = await Transaction.create(payload);
  return transaction;
};

const getUserTransactionHistory = async (userId: string) => {
  const transactions = await Transaction.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });
  return transactions;
};

export const transactionService = {
  createTransaction,
  getUserTransactionHistory,
};
