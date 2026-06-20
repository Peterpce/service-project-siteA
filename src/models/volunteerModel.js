import db from "../config/db.js";

// Add volunteer
export async function addVolunteer(userId, projectId) {
  const sql = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
  `;
  return db.query(sql, [userId, projectId]);
}

// Remove volunteer
export async function removeVolunteer(userId, projectId) {
  const sql = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
  `;
  return db.query(sql, [userId, projectId]);
}

// Get user projects
export async function getVolunteerProjects(userId) {
  const sql = `
    SELECT p.*
    FROM projects p
    JOIN volunteers v ON p.id = v.project_id
    WHERE v.user_id = $1
  `;
  const result = await db.query(sql, [userId]);
  return result.rows;
}

// Check volunteer
export async function isVolunteer(userId, projectId) {
  const sql = `
    SELECT 1
    FROM volunteers
    WHERE user_id = $1 AND project_id = $2
  `;
  const result = await db.query(sql, [userId, projectId]);
  return result.rowCount > 0;
}