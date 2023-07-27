import Express from "express";
import { isAdmin, requiresignin } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updatecategoryController,
} from "../controllers/createCategoryController.js";

const router = Express.Router();

//routes
//Create category
router.post(
  "/create-category",
  requiresignin,
  isAdmin,
  createCategoryController
);

//Upadte Category
router.put(
  "/update-category/:id",
  requiresignin,
  isAdmin,
  updatecategoryController
);

//Get All Category
router.get("/get-category", categoryController);

//Get single Category
router.get("/single-category/:slug", singleCategoryController);

//Delete Category
router.delete(
  "/delete-category/:id",
  requiresignin,
  isAdmin,
  deleteCategoryController
);

export default router;
