import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

import userRoutes from "./routes/userRoute.js";
import carRoutes from "./routes/carRoute.js";
import fileUpload from "express-fileupload";

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
app.use(
  fileUpload({
    useTempFiles: false,
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

// Routes

app.use("/api/v1/user", userRoutes);
// http://localhost:3000/api/v1/user/register
app.use("/api/v1/car", carRoutes);
// http://localhost:3000/api/v1/car/createCar

export default app;
