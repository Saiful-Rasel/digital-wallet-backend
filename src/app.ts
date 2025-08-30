import express from "express";
import cors from "cors";
import { router } from "./app/Routes";
import { notFound } from "./app/middleware/notRoute";
import { globalErrorHandler } from "./app/middleware/GlobalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "https://digital-wallet-frontend-xi.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
