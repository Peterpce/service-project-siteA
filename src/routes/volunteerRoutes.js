import express from "express";
import {
  volunteerForProject,
  removeVolunteer
} from "../controllers/volunteerController.js";

import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add user as volunteer
router.post(
  "/projects/:id/volunteer",
  requireLogin,
  volunteerForProject
);

// Remove user as volunteer
router.post(
  "/projects/:id/remove-volunteer",
  requireLogin,
  removeVolunteer
);

export default router;