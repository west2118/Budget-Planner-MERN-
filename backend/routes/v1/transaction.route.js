import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getAllUserTransactions,
  deleteTransaction,
  getUserTransactions,
  postTransaction,
  putTransaction,
} from "../../controllers/v1/transaction.controller.js";

const router = express.Router();

router.get("/transactions", verifyToken, getAllUserTransactions);
router.get("/transaction", verifyToken, getUserTransactions);
router.post("/transaction", verifyToken, postTransaction);
router.put("/transaction/:id", verifyToken, putTransaction);
router.delete("/transaction/:id", verifyToken, deleteTransaction);

export default router;
