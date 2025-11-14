import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  deleteTransaction,
  getTransaction,
  postTransaction,
  putTransaction,
} from "../../controllers/v1/transaction.controller.js";

const router = express.Router();

router.get("/transaction", verifyToken, getTransaction);
router.post("/transaction", verifyToken, postTransaction);
router.put("/transaction/:id", verifyToken, putTransaction);
router.delete("/transaction", verifyToken, deleteTransaction);

export default router;
