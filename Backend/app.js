import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

import userRoutes from "./routes/userRoute.js";

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// Routes

app.use("/api/v1/user", userRoutes);
// http://localhost:3000/api/v1/user/register

export default app;
