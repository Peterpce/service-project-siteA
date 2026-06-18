import db from "../config/db.js";

// Add volunteer
export async function addVolunteer(userId, projectId) {
  const sql = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
    RETURNING *;
  `;

  const result = await db.query(sql, [userId, projectId]);
  return result.rows[0];
}

// Remove volunteer
export async function removeVolunteer(userId, projectId) {
  const sql = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2;
  `;

  await db.query(sql, [userId, projectId]);
}

// Check if user is volunteer
export async function isVolunteer(userId, projectId) {
  const sql = `
    SELECT 1
    FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    LIMIT 1;
  `;

  const result = await db.query(sql, [userId, projectId]);
  return result.rows.length > 0;
}

// Get user's volunteered projects (dashboard)
export async function getUserVolunteerProjects(userId) {
  const sql = `
    SELECT p.*
    FROM projects p
    JOIN volunteers v
      ON p.id = v.project_id
    WHERE v.user_id = $1
    ORDER BY p.id DESC;
  `;

  const result = await db.query(sql, [userId]);
  return result.rows;
}