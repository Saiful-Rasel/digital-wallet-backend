export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
}

export interface IAuthProvider {
  provider: "Creadential" | "Google";
  providerId: string;
}
export enum isActive{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}


export interface IUser {
  name: string;
  phoneNumber?: string;
  email: string;
  picture?: string;
  address?: string;
  password?: string;
  role: UserRole;
  isBlocked?: boolean;
  isApproved?: boolean;
  auth: IAuthProvider[];
 
  isVerified?: boolean;
  isDeleted?: string;
  isActive?: isActive;
}
