import mongoose from "mongoose";
import app from "./app";
import { envVariable } from "./app/config/env";
import { seedAdmin } from "./app/utils/admin";
import { Server } from "http";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVariable.uri as string);
    console.log("mongoose connected");

    server= app.listen(envVariable.port, () => {
      console.log(`Example app listening on port ${envVariable.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
(async () => {
  await startServer()
  await seedAdmin()
})()


process.on("SIGTERM", () => {
  console.log("uhhanlde rejection");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.log("uhhanlde rejection", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException rejection", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});