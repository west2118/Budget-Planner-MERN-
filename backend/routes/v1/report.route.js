import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  getReportSummary,
  getReportCharts,
} from "../../controllers/v1/report.controller.js";

const router = express.Router();

router.get("/reports/summary", verifyToken, getReportSummary);
router.get("/reports/charts", verifyToken, getReportCharts);

export default router;
