import pool from "../../database/db.js";

/**
 * Get all organizations
 */
export async function getAllOrganizations() {
  // PostgreSQL uses object destructuring { rows } instead of array destructuring [rows]
  const { rows } = await pool.query(
    "SELECT id, name, description FROM organizations ORDER BY id ASC"
  );

  return rows;
}

/**
 * Get organization by ID (optional)
 */
export async function getOrganizationById(id) {
  // 1. Changed [rows] to { rows }
  // 2. Changed MySQL placeholder "?" to PostgreSQL placeholder "$1"
  const { rows } = await pool.query(
    "SELECT id, name, description FROM organizations WHERE id = $1",
    [id]
  );

  return rows[0];
}