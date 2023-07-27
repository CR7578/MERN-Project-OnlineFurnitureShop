import Express from "express";
import { isAdmin, requiresignin } from "../middlewares/authMiddleware.js";
import {
  createFurnitureController,
  deleteFurnitureController,
  filtersFurnitureController,
  furnitureCountController,
  furnitureListController,
  furniturePhotoController,
  getFurnitureController,
  getSingleFurnitureController,
  updateFurnitureController,
  furnitureSearchController,
  relatedFurnitureController,
  furnitureCategoryController,
  braintreeTokenController,
  braintreePaymentController,
  quantityController,
} from "../controllers/furnitureController.js";
import formidable from "express-formidable";

const router = Express.Router();

//Furniture Routes

router.post(
  "/create-furniture",
  requiresignin,
  isAdmin,
  formidable(),
  createFurnitureController
);

router.put(
  "/update-furniture/:fid",
  requiresignin,
  isAdmin,
  formidable(),
  updateFurnitureController
);

//Get Furniture
router.get("/get-furniture", getFurnitureController);

//Single Furniture
router.get("/single-furniture/:slug", getSingleFurnitureController);

//Furniture Photo
router.get("/furniture-photo/:fid", furniturePhotoController);

//Delete Furniture
router.delete("/delete-furniture/:fid", deleteFurnitureController);

//Filter Furnitures
router.post("/filters-furniture", filtersFurnitureController);

//Furnitures list count
router.get("/furniture-count", furnitureCountController);

//furniture per page
router.get("/furniture-list/:page", furnitureListController);

//Seacrch Furniture
router.get("/search/:keywords", furnitureSearchController);

//Similar furnitures
router.get("/related-furniture/:fid/:cid", relatedFurnitureController);

//category wise furnitures
router.get("/furniture-category/:slug", furnitureCategoryController);

//payments routes

//token
router.get("/braintree/token", braintreeTokenController);

//New Order payment
router.post(
  "/braintree/payment",
  requiresignin,
  braintreePaymentController,
  quantityController
);
// router.put("/quantity", requiresignin, quantityController);

export default router;
