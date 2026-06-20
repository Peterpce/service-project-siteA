import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// =========================
// LOAD ENV FIRST
// =========================
dotenv.config();

// =========================
// CREATE APP (MUST BE FIRST)
// =========================
const app = express();
const port = process.env.PORT || 3000;

// =========================
// SECURITY + HELMET
// =========================
import helmet from "helmet";

// =========================
// SESSION + FLASH + DATABASE STORE
// =========================
import session from "express-session";
import flash from "connect-flash";
import pgSession from "connect-pg-simple";
import db from "./src/config/db.js";

// =========================
// DATABASE INIT
// =========================
import { initializeUserTable } from "./src/models/userModel.js";

// =========================
// MIDDLEWARE
// =========================
import { requireLogin } from "./src/middleware/authMiddleware.js";

// =========================
// ROUTES
// =========================
import organizationRoutes from "./src/routes/organizationRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import volunteerRoutes from "./src/routes/volunteerRoutes.js";

// =========================
// ERROR HANDLING (GLOBAL)
// =========================
process.on("unhandledRejection", (reason, p) => {
  console.error("❌ UNHANDLED REJECTION:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});

// =========================
// PATH FIX
// =========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// SECURITY MIDDLEWARE
// =========================
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// =========================
// VIEW ENGINE
// =========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// =========================
// STATIC FILES
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// BODY PARSER
// =========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================
// SESSION STORE
// =========================
app.set("trust proxy", 1);

const PostgresStore = pgSession(session);
const store = new PostgresStore({
  pool: db,
  tableName: "session",
  createTableIfMissing: true,
  pruneSessionInterval: 60,
});

store.on("error", (err) => {
  console.error("SESSION STORE ERROR:", err);
});

app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 30,
    },
  })
);

// =========================
// FLASH
// =========================
app.use(flash());

// =========================
// GLOBAL VARIABLES
// =========================
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;

  res.locals.success = req.flash("success")[0] || null;
  res.locals.error = req.flash("error")[0] || null;

  next();
});

// =========================
// ROUTES
// =========================
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use("/", authRoutes);
app.use("/", userRoutes);

app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

// ⭐ VOLUNTEER ROUTES (NEW)
app.use("/", volunteerRoutes);

// =========================
// 404
// =========================
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// =========================
// ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500", { title: "Server Error" });
});

// =========================
// START SERVER
// =========================
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  try {
    await initializeUserTable();
  } catch (err) {
    console.error("DB init warning:", err.message);
  }
});