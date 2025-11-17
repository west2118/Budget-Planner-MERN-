import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getAllUserGoals,
  getUserGoals,
  postGoal,
  putGoal,
  deleteGoal,
} from "../../controllers/v1/goal.controller.js";

const router = express.Router();

router.get("/goals", verifyToken, getAllUserGoals);
router.get("/goal", verifyToken, getUserGoals);
router.post("/goal", verifyToken, postGoal);
router.put("/goal/:id", verifyToken, putGoal);
router.delete("/goal/:id", verifyToken, deleteGoal);

export default router;
