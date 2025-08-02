import mongoose from "mongoose";

export interface ITransaction {
  sender: mongoose.Types.ObjectId  | string;    
  receiver: mongoose.Types.ObjectId  | string;  
  balance: number;                    
  type: "deposit" | "withdraw" | "transfer" | "agent-cash-in" | "agent-cash-out";
  status: "pending" | "completed" | "failed" | "reversed";
  fee?: number;                      
  commission?: number;               

}