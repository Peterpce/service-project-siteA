import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Models (named exports)
import { getAllOrganizations } from "./src/models/organizationModel.js";
import { getAllProjects } from "./src/models/projectModel.js";
import { getAllCategories } from "./src/models/categoryModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// VIEW ENGINE (FIXED)
// =========================
app.set("view engine", "ejs");

// ✅ FIX: point to correct MVC views folder
app.set("views", path.join(__dirname, "src/views"));

// =========================
// STATIC FILES
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// =========================
// ORGANIZATIONS
// =========================
app.get("/organizations", async (req, res) => {
    try {
        const organizations = await getAllOrganizations();

        res.render("organizations", {
            title: "Organizations",
            organizations
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// =========================
// PROJECTS
// =========================
app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();

        res.render("projects", {
            title: "Projects",
            projects
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// =========================
// CATEGORIES
// =========================
app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "Categories",
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// =========================
// START SERVER
// =========================
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});