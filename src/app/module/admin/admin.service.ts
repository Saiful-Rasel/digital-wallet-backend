import { Transaction } from "../transactions/transaction.model"
import { isActive } from "../user/user.interface"
import { User } from "../user/user.model"
import { Wallet } from "../wallet/wallet.model"

const adminViewAllUser = async() =>{
  const allUser = await User.find()
  return allUser
}


const adminViewAllAgent = async() =>{
const allagent = await User.find({role:"AGENT"})
  return allagent
}

const adminViewAllWallet = async() =>{
const allWallet = await Wallet.find().populate("user")
  return allWallet
}
const adminViewAllTransaction = async() =>{
const allTransaction = await Transaction.find().populate("sender receiver")
  return allTransaction
}

const suspendAgent = async(userId:string)=>{
    const updateAgent = await User.findByIdAndUpdate(userId,{isApproved:false,isVerified:false,isActive:isActive.INACTIVE},{new:true})
    return updateAgent
}

const approveAgent = async(userId:string)=>{
    const updateAgent = await User.findByIdAndUpdate(userId,{isApproved:true,isActive:isActive.ACTIVE,isVerified:true},{new:true})
    return updateAgent
}

const blockWallet = async(walletId:string)=>{
    const updateWallet = await Wallet.findByIdAndUpdate(walletId,{isBlocked:true},{new:true})
    return updateWallet
}
const unBlockWallet = async(walletId:string)=>{
const updateWallet = await Wallet.findByIdAndUpdate(walletId,{isBlocked:false},{new:true})
    return updateWallet
}
export const adminService = {
adminViewAllUser,
adminViewAllAgent,
adminViewAllWallet,
adminViewAllTransaction,
suspendAgent,
blockWallet,
unBlockWallet,
approveAgent
}