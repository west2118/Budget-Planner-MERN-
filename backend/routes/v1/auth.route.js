import express from "express";
import { register, login, refresh, logout } from "../../controllers/v1/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
