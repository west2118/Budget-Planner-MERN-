import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({ path: ".env" });

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

import userRoutes from "./routes/v1/user.route.js";
import cardRoutes from "./routes/v1/card.route.js";
import transactionRoutes from "./routes/v1/transaction.route.js";
import goalRoutes from "./routes/v1/goal.route.js";
import reportRoutes from "./routes/v1/report.route.js";
import budgetRoutes from "./routes/v1/budget.route.js";

import authRoutes from "./routes/v1/auth.route.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", cardRoutes);
app.use("/api/v1", transactionRoutes);
app.use("/api/v1", goalRoutes);
app.use("/api/v1", reportRoutes);
app.use("/api/v1", budgetRoutes);
