import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  deleteCard,
  getUserCards,
  getCardsSummary,
  postCard,
  putCard,
} from "../../controllers/v1/card.controller.js";

const router = express.Router();

router.get("/cards", verifyToken, getUserCards);
router.get("/cards/summary", verifyToken, getCardsSummary);
router.post("/cards", verifyToken, postCard);
router.put("/cards/:id", verifyToken, putCard);
router.delete("/cards/:id", verifyToken, deleteCard);

export default router;
