import pool from "../../database/db.js";

/**
 * Get all projects with organization name
 */
export async function getAllProjects() {
  const [rows] = await pool.query(`
    SELECT 
      projects.id,
      projects.name,
      projects.description,
      organizations.name AS organization_name
    FROM projects
    INNER JOIN organizations
      ON projects.organization_id = organizations.id
    ORDER BY projects.id ASC
  `);

  return rows;
}

/**
 * Get project by ID (optional)
 */
export async function getProjectById(id) {
  const [rows] = await pool.query(`
    SELECT 
      projects.id,
      projects.name,
      projects.description,
      organizations.name AS organization_name
    FROM projects
    INNER JOIN organizations
      ON projects.organization_id = organizations.id
    WHERE projects.id = ?
  `, [id]);

  return rows[0];
}