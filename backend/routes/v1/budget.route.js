import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getBudgets,
  getBudgetSummary,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../controllers/v1/budget.controller.js";

const router = express.Router();

router.get("/budgets/summary", verifyToken, getBudgetSummary);
router.get("/budgets", verifyToken, getBudgets);
router.post("/budgets", verifyToken, createBudget);
router.put("/budgets/:id", verifyToken, updateBudget);
router.delete("/budgets/:id", verifyToken, deleteBudget);

export default router;
