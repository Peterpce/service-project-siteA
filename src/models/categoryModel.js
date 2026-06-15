import pool from "../../database/db.js";

/**
 * Get all categories
 */
export async function getAllCategories() {
  // Changed [rows] to { rows }
  const { rows } = await pool.query(
    "SELECT id, name FROM categories ORDER BY name ASC"
  );

  return rows;
}

/**
 * Get category by ID (optional)
 */
export async function getCategoryById(id) {
  // Changed [rows] to { rows } and "?" to "$1"
  const { rows } = await pool.query(
    "SELECT id, name FROM categories WHERE id = $1",
    [id]
  );

  return rows[0];
}