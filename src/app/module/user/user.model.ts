import mongoose, { model, Schema } from "mongoose";
import { IAuthProvider, isActive, UserRole } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isBlocked: { type: Boolean },
    isApproved: { type: Boolean,default:false },
    picture: { type: String },
    address: { type: String },
    auth: [authProviderSchema],
 
    isVerified: { type: Boolean, default: true },
    isActive: {
      type: String,
      enum: Object.values(isActive),
      default: isActive.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
