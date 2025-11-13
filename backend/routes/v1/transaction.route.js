import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getTransaction,
  postTransaction,
} from "../../controllers/v1/transaction.controller.js";

const router = express.Router();

router.get("/transaction", verifyToken, getTransaction);
router.post("/transaction", verifyToken, postTransaction);

export default router;
