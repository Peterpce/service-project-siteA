import { getAllCategories as getAllCategoriesModel } from "../models/categoryModel.js";

// GET all categories
export async function getAllCategories(req, res) {
    try {
        const categories = await getAllCategoriesModel();

        res.render("categories", {
            title: "Categories",
            categories
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Server Error");
    }
}