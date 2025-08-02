import { z } from "zod";

export const UserRoleEnum = z.enum(["ADMIN", "USER", "AGENT"]);

const authProviderSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  providerId: z.string().min(1, "Provider ID is required"),
});

export const createUserZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().optional(),
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  isBlocked: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  picture: z.string().optional(),
  address: z.string().optional(),
  auth: z.array(authProviderSchema).optional(),
});
