import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes (MVC style)
import organizationRoutes from "./routes/organizationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES Modules
// Since server.js is inside 'src', __dirname points directly to the 'src' folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// VIEW ENGINE
// =========================
app.set("view engine", "ejs");
// Look directly inside the current 'src' directory for the 'views' folder
app.set("views", path.join(__dirname, "views"));

// =========================
// STATIC FILES
// =========================
// Step up one level (..) out of 'src' to find the 'public' folder in the root
app.use(express.static(path.join(__dirname, "../public")));

// =========================
// ROUTES (MVC CLEAN STRUCTURE)
// =========================
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

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