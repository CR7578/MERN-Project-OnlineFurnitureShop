import Express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetpasswordController,
  upadteProfileController,
  getOrdersController,
  getAllOrdersController,
  orderUpdateController,
} from "../controllers/authController.js";
import { isAdmin, requiresignin } from "../middlewares/authMiddleware.js";

//router object
const router = Express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//FORGET-PASSWORD || POST
router.post("/forget-password", forgetpasswordController);

//test routes
router.get("/test", requiresignin, isAdmin, testController);

//Protected User route auth
router.get("/user-auth", requiresignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin route auth
router.get("/admin-auth", requiresignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update profile
router.put("/profile", requiresignin, upadteProfileController);

//Orders
router.get("/orders", requiresignin, getOrdersController);

//All Orders
router.get("/all-orders", requiresignin, isAdmin, getAllOrdersController);

//Order Status Update
router.put(
  "/order-status/:orderId",
  requiresignin,
  isAdmin,
  orderUpdateController
);

export default router;
