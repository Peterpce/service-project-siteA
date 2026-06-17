import express from "express";
const router = express.Router();

// Import controller (named export)
import { getAllCategories } from "../controllers/categoryController.js";

// GET all categories
router.get("/", getAllCategories);

export default router;