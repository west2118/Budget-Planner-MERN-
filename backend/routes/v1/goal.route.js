import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getAllUserGoals,
  getUserGoals,
  postGoal,
  putGoal,
  deleteGoal,
  getGoalsSummary,
} from "../../controllers/v1/goal.controller.js";

const router = express.Router();

router.get("/goals", verifyToken, getAllUserGoals);
router.get("/goals/summary", verifyToken, getGoalsSummary);
router.get("/goals/active", verifyToken, getUserGoals);
router.post("/goals", verifyToken, postGoal);
router.put("/goals/:id", verifyToken, putGoal);
router.delete("/goals/:id", verifyToken, deleteGoal);

export default router;
