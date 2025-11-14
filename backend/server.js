import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import { createRequire } from "module";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
app.use(cors());
app.use(express.json());

import userRoutes from "./routes/v1/user.route.js";
import cardRoutes from "./routes/v1/card.route.js";
import transactionRoutes from "./routes/v1/transaction.route.js";
import goalRoutes from "./routes/v1/goal.route.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

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

app.use("/api/v1", userRoutes);
app.use("/api/v1", cardRoutes);
app.use("/api/v1", transactionRoutes);
app.use("/api/v1", goalRoutes);
