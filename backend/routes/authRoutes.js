import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Default export for ES module import
export default router;
