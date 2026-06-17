import express from "express";
const router = express.Router();

import { getAllOrganizations } from "../controllers/organizationController.js";

// GET all organizations
router.get("/", getAllOrganizations);

export default router;