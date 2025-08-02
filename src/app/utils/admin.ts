import { email } from "zod";
import { envVariable } from "../config/env";
import { User } from "../module/user/user.model";
import { IAuthProvider, IUser, UserRole } from "../module/user/user.interface";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  try {
    const isUserExist = await User.findOne({
      email: envVariable.ADMIN as string,
    });
    if (isUserExist) {
      console.log(" admin already exist");
      return;
    }
    const authProvider: IAuthProvider = {
      provider: "Creadential",
      providerId: envVariable.ADMIN as string,
    };

    const hashedPassword = await bcrypt.hash(
      envVariable.ADMIN_PASSWORD as string,
      Number(envVariable.bcrypt_Salt_round)
    );

    const admin: IUser = {
      name: "admin",
      email: envVariable.ADMIN as string,
      role: UserRole.ADMIN,
      isVerified: true,
      auth: [authProvider],
      password: hashedPassword,
    };

    const createAdmin = await User.create(admin);
  } catch (error) {
    console.log("from seedadmin", error);
  }
};
