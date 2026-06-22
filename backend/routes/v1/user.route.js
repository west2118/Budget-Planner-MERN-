import express from "express";
import { getUser, updateProfile, changePassword } from "../../controllers/v1/user.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUser);
router.put("/user/profile", verifyToken, updateProfile);
router.put("/user/password", verifyToken, changePassword);

export default router;
