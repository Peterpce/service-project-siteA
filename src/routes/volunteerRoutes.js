const express = require("express");
const router = express.Router();

const volunteerController = require("../controllers/volunteerController");
const { requireLogin } = require("../middleware/authMiddleware");

// Add user as volunteer (join project)
router.post(
  "/projects/:id/volunteer",
  requireLogin,
  volunteerController.volunteerForProject
);

// Remove user as volunteer (leave project)
router.post(
  "/projects/:id/remove-volunteer",
  requireLogin,
  volunteerController.removeVolunteer
);

module.exports = router;