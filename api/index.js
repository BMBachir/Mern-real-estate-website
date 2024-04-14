import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Error:" + err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

//middleware
app.use("/api/user", userRouter);
