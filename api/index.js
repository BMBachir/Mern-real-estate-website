import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

// Check if environment variables are loaded
if (!process.env.MONGO || !process.env.JWT_SECRET) {
  console.error("Missing environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
