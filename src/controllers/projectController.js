import * as projectModel from "../models/projectModel.js";
import * as categoryModel from "../models/categoryModel.js";
import * as volunteerModel from "../models/volunteerModel.js"; // ✅ NEW

// GET all projects (list page)
export async function getAllProjects(req, res, next) {
    try {
        const projects =
            await projectModel.getAllProjects();

        res.render("project/list", {
            title: "Projects",
            projects
        });

    } catch (error) {
        next(error);
    }
}

// GET project details page
export async function getProjectById(req, res, next) {
    try {
        const id = req.params.id;

        const project =
            await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).render("404", {
                title: "Project Not Found"
            });
        }

        const organization =
            await projectModel.getOrganizationByProject(id);

        const categories =
            await projectModel.getCategoriesByProject(id);

        // ✅ NEW: check volunteer status
        let isVolunteer = false;

        if (req.session.user) {
            isVolunteer =
                await volunteerModel.isVolunteer(
                    req.session.user.user_id,
                    id
                );
        }

        res.render("project/detail", {
            title: project.name,
            project,
            organization,
            categories,
            user: req.session.user, // ✅ required for EJS access control
            isVolunteer              // ✅ controls UI toggle
        });

    } catch (error) {
        next(error);
    }
}

// SHOW CREATE FORM
export function showCreateForm(req, res) {
    res.render("project/create", {
        title: "Create Project",
        errors: []
    });
}

// SHOW EDIT FORM
export async function showEditForm(req, res, next) {
    try {
        const id = req.params.id;

        const project =
            await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).render("404", {
                title: "Project Not Found"
            });
        }

        res.render("project/edit", {
            title: "Edit Project",
            project,
            errors: []
        });

    } catch (error) {
        next(error);
    }
}

// SHOW ASSIGN CATEGORY FORM
export async function showAssignCategoryForm(req, res, next) {
    try {
        const id = req.params.id;

        const project =
            await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).render("404", {
                title: "Project Not Found"
            });
        }

        const categories =
            await categoryModel.getAllCategories();

        const assigned =
            await projectModel.getCategoriesByProject(id);

        const assignedCategories = assigned.map(c => c.id);

        res.render("project/assign-category", {
            title: "Assign Categories",
            project,
            categories,
            assignedCategories,
            errors: []
        });

    } catch (error) {
        next(error);
    }
}

//
// ============================
// ✅ VOLUNTEER FEATURE (W06)
// ============================
//

// POST: Volunteer for a project
export async function volunteerForProject(req, res, next) {
    try {
        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await volunteerModel.addVolunteer(userId, projectId);

        res.redirect(`/projects/${projectId}`);

    } catch (error) {
        next(error);
    }
}

// POST: Remove volunteer
export async function removeVolunteer(req, res, next) {
    try {
        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await volunteerModel.removeVolunteer(userId, projectId);

        res.redirect(`/projects/${projectId}`);

    } catch (error) {
        next(error);
    }
}