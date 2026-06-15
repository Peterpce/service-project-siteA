import pool from "../../database/db.js";

/**
 * Get all categories from database
 */
export async function getAllCategories() {
  const [rows] = await pool.query(
    "SELECT id, name FROM categories ORDER BY name ASC"
  );

  return rows;
}

/**
 * Get single category by ID (optional for future use)
 */
export async function getCategoryById(id) {
  const [rows] = await pool.query(
    "SELECT id, name FROM categories WHERE id = ?",
    [id]
  );

  return rows[0];
}