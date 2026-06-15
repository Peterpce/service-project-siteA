import pool from "../../database/db.js";

/**
 * Get all organizations
 */
export async function getAllOrganizations() {
  const [rows] = await pool.query(
    "SELECT id, name, description FROM organizations ORDER BY id ASC"
  );

  return rows;
}

/**
 * Get organization by ID (optional)
 */
export async function getOrganizationById(id) {
  const [rows] = await pool.query(
    "SELECT id, name, description FROM organizations WHERE id = ?",
    [id]
  );

  return rows[0];
}