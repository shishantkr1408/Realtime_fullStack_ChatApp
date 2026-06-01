import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { clearAIChat } from "../controllers/ai.controller.js";

const router = express.Router();

router.delete(
  "/clear-chat",
  protectRoute,
  clearAIChat
);

export default router;