import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getUserCards,
  postCard,
} from "../../controllers/v1/card.controller.js";

const router = express.Router();

router.get("/card", verifyToken, getUserCards);
router.post("/card", verifyToken, postCard);

export default router;
