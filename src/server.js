import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes (MVC style)
import organizationRoutes from "./routes/organizationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// ✅ OPTIONAL BUT IMPORTANT (if you created it separately)
// import volunteerRoutes from "./routes/volunteerRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// VIEW ENGINE
// =========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =========================
// MIDDLEWARE (IMPORTANT FOR FORMS)
// =========================
app.use(express.urlencoded({ extended: true })); // ✅ REQUIRED for POST forms

// =========================
// STATIC FILES
// =========================
app.use(express.static(path.join(__dirname, "../public")));

// =========================
// ROUTES
// =========================
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

// ✅ VOLUNTEER ROUTES (ONLY IF YOU CREATED SEPARATE FILE)
// app.use("/projects", volunteerRoutes);

// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// =========================
// START SERVER
// =========================
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});