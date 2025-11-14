import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getUserGoals,
  postGoal,
} from "../../controllers/v1/goal.controller.js";

const router = express.Router();

router.get("/goal", verifyToken, getUserGoals);
router.post("/goal", verifyToken, postGoal);

export default router;
