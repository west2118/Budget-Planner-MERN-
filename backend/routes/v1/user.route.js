import express from "express";
import { postUser, getUser } from "../../controllers/v1/user.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/user", verifyToken, postUser);
router.get("/user", verifyToken, getUser);

export default router;
