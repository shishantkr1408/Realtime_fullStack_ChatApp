import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadDocument } from "../controllers/document.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protectRoute,
  upload.single("pdf"),
  uploadDocument
);

export default router;