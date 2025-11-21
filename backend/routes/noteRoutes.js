import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", authenticateToken, createNote);
router.get("/", authenticateToken, getNotes);
router.get("/:id", authenticateToken, getNoteById);
router.put("/:id", authenticateToken, updateNote);
router.delete("/:id", authenticateToken, deleteNote);

export default router;
