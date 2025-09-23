import dotenv from "dotenv";

dotenv.config();

export const envVariable = {
  port: process.env.PORT,
  uri: process.env.URI,
  bcrypt_Salt_round: process.env.BCRYPT_SALT_ROUND,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN: process.env.ADMIN,
  ADMIN_PASSWORD: process.env.PASSWORD,
  GOOGLE_CLIENT: process.env.GOOGLE_CLIENT as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  GOOLE_SECRET: process.env.GOOLE_SECRET as string,
};
