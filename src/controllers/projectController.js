import {
    getAllProjects as getAllProjectsModel,
    getProjectById as getProjectByIdModel
} from "../models/projectModel.js";

// GET all projects
export async function getAllProjects(req, res) {
    try {
        const projects = await getAllProjectsModel();

        res.render("projects", {
            title: "Projects",
            projects
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Server Error");
    }
}

// GET single project by ID (optional)
export async function getProjectById(req, res) {
    try {
        const id = req.params.id;
        const project = await getProjectByIdModel(id);

        if (!project) {
            return res.status(404).send("Project not found");
        }

        res.render("project-detail", {
            title: "Project Details",
            project
        });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send("Server Error");
    }
}