import {
    getAllOrganizations as getAllOrganizationsModel,
    getOrganizationById as getOrganizationByIdModel
} from "../models/organizationModel.js";

// GET all organizations
export async function getAllOrganizations(req, res) {
    try {
        const organizations = await getAllOrganizationsModel();

        res.render("organizations", {
            title: "Organizations",
            organizations
        });
    } catch (error) {
        console.error("Error fetching organizations:", error);
        res.status(500).send("Server Error");
    }
}

// GET organization by ID
export async function getOrganizationById(req, res) {
    try {
        const id = req.params.id;
        const organization = await getOrganizationByIdModel(id);

        if (!organization) {
            return res.status(404).send("Organization not found");
        }

        res.render("organization-detail", {
            title: "Organization Details",
            organization
        });
    } catch (error) {
        console.error("Error fetching organization:", error);
        res.status(500).send("Server Error");
    }
}