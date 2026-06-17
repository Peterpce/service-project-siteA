import express from "express";
const router = express.Router();

import {
    getAllProjects,
    getProjectById
} from "../controllers/projectController.js";

// GET all projects
router.get("/", getAllProjects);

// GET single project by ID (optional)
router.get("/:id", getProjectById);

export default router;