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
import path from "path";
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

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Set Content Security Policy

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src  'self'; connect-src 'self' https://firebasestorage.googleapis.com; img-src 'self' https://firebasestorage.googleapis.com; img-src 'self' https://example.com"
  );
  next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

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
