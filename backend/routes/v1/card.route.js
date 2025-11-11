import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  deleteCard,
  getUserCards,
  postCard,
  putCard,
} from "../../controllers/v1/card.controller.js";

const router = express.Router();

router.get("/card", verifyToken, getUserCards);
router.post("/card", verifyToken, postCard);
router.put("/card/:id", verifyToken, putCard);
router.delete("/card/:id", verifyToken, deleteCard);

export default router;
