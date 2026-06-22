import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getUserReportTransactions,
  deleteTransaction,
  getUserTransactions,
  postTransaction,
  putTransaction,
  getTransactionSummary,
  getDashboardCharts
} from "../../controllers/v1/transaction.controller.js";

const router = express.Router();

router.get("/transactions", verifyToken, getUserTransactions);
router.get("/transactions/summary", verifyToken, getTransactionSummary);
router.get("/transactions/charts", verifyToken, getDashboardCharts);
router.get("/transactions/report", verifyToken, getUserReportTransactions);
router.post("/transactions", verifyToken, postTransaction);
router.put("/transactions/:id", verifyToken, putTransaction);
router.delete("/transactions/:id", verifyToken, deleteTransaction);

export default router;
