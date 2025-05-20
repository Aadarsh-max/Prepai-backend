import express from "express";
import {
  createSession,
  getSessionById,
  getMySessions,
  deleteSessions,
} from "../controllers/sessionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSessions);

export default router;
