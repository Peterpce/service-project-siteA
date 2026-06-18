import express from "express";
import {
    getAllProjects,
    getProjectById,
    showCreateForm,
    showEditForm,
    showAssignCategoryForm,
    volunteerForProject,
    removeVolunteer
} from "../controllers/projectController.js";

import {
    requireLogin,
    requireRole
} from "../middleware/authMiddleware.js";

const router = express.Router();

//
// ==========================================
// 🌍 PUBLIC ROUTES
// ==========================================
//

// GET all projects
router.get("/", getAllProjects);

// GET project details
router.get("/:id", getProjectById);

//
// ==========================================
// ❤️ VOLUNTEER ROUTES (W06 - REQUIRED)
// ==========================================
//

// ADD volunteer (must be logged in)
router.post(
    "/:id/volunteer",
    requireLogin,
    volunteerForProject
);

// REMOVE volunteer (must be logged in)
router.post(
    "/:id/unvolunteer",
    requireLogin,
    removeVolunteer
);

//
// ==========================================
// 🔒 ADMIN ROUTES (UNCHANGED)
// ==========================================
//

// CREATE form
router.get(
    "/create",
    requireLogin,
    requireRole("admin"),
    showCreateForm
);

// EDIT form
router.get(
    "/edit/:id",
    requireLogin,
    requireRole("admin"),
    showEditForm
);

// ASSIGN CATEGORY
router.get(
    "/assign-category/:id",
    requireLogin,
    requireRole("admin"),
    showAssignCategoryForm
);

export default router;