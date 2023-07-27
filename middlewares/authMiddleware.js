import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected routes token base
export const requiresignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Admin access
export const isAdmin = async (req, res, next) => {
  try {
    //check User is Admin or not
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(200).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {}
};
