const volunteerModel = require("../models/volunteerModel");

// Add user as volunteer
const volunteerForProject = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const projectId = req.params.id;

    await volunteerModel.addVolunteer(userId, projectId);

    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error("Volunteer Error:", error);
    res.status(500).render("500");
  }
};

// Remove user as volunteer
const removeVolunteer = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const projectId = req.params.id;

    await volunteerModel.removeVolunteer(userId, projectId);

    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error("Remove Volunteer Error:", error);
    res.status(500).render("500");
  }
};

// Get all projects a user volunteered for
const getVolunteerProjects = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const volunteerProjects =
      await volunteerModel.getVolunteerProjects(userId);

    res.render("dashboard", {
      title: "Dashboard",
      volunteerProjects,
      user: req.session.user
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).render("500");
  }
};

module.exports = {
  volunteerForProject,
  removeVolunteer,
  getVolunteerProjects
};