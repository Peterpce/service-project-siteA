import * as volunteerModel from "../models/volunteerModel.js";

// =========================
// ADD VOLUNTEER
// =========================
export async function volunteerForProject(req, res) {
  try {
    const userId = req.session.user.id;
    const projectId = req.params.id;

    await volunteerModel.addVolunteer(userId, projectId);

    res.redirect(`/projects/${projectId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding volunteer");
  }
}

// =========================
// REMOVE VOLUNTEER
// =========================
export async function removeVolunteer(req, res) {
  try {
    const userId = req.session.user.id;
    const projectId = req.params.id;

    await volunteerModel.removeVolunteer(userId, projectId);

    res.redirect(`/projects/${projectId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing volunteer");
  }
}