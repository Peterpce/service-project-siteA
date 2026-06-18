import pool from "../../database/db.js";

// GET all projects (list page)
export async function getAllProjects() {
    const sql = `
        SELECT *
        FROM projects
        ORDER BY name
    `;

    const result = await pool.query(sql);
    return result.rows;
}

// GET project by ID (details page)
export async function getProjectById(id) {
    const sql = `
        SELECT *
        FROM projects
        WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

// GET organization for a project
export async function getOrganizationByProject(id) {
    const sql = `
        SELECT organizations.*
        FROM organizations
        JOIN projects
            ON organizations.id = projects.organization_id
        WHERE projects.id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

// GET categories for a project
export async function getCategoriesByProject(projectId) {
    const sql = `
        SELECT categories.*
        FROM categories
        JOIN project_categories
            ON categories.id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY categories.name
    `;

    const result = await pool.query(sql, [projectId]);
    return result.rows;
}

//
// =====================================
// ✅ W06 VOLUNTEER FEATURE (NEW)
// =====================================
//

// GET projects a user has volunteered for
export async function getUserVolunteerProjects(userId) {
    const sql = `
        SELECT projects.*
        FROM projects
        JOIN volunteers
            ON projects.id = volunteers.project_id
        WHERE volunteers.user_id = $1
        ORDER BY projects.name
    `;

    const result = await pool.query(sql, [userId]);
    return result.rows;
}

// ADD volunteer
export async function addVolunteer(userId, projectId) {
    const sql = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
    `;

    await pool.query(sql, [userId, projectId]);
}

// REMOVE volunteer
export async function removeVolunteer(userId, projectId) {
    const sql = `
        DELETE FROM volunteers
        WHERE user_id = $1
        AND project_id = $2
    `;

    await pool.query(sql, [userId, projectId]);
}

// CHECK if user is already volunteering
export async function isVolunteer(userId, projectId) {
    const sql = `
        SELECT 1
        FROM volunteers
        WHERE user_id = $1
        AND project_id = $2
        LIMIT 1
    `;

    const result = await pool.query(sql, [userId, projectId]);
    return result.rows.length > 0;
}