import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Address is required" });
    }

    function validatePassword(pass) {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

      const hasUppercase = uppercaseRegex.test(pass);
      const hasLowercase = lowercaseRegex.test(pass);
      const hasNumber = numberRegex.test(pass);
      const hasSymbol = symbolRegex.test(pass);

      return hasUppercase && hasLowercase && hasNumber && hasSymbol;
    }

    const isValid = validatePassword(password);

    if (!isValid) {
      return res.send({ message: "Password is invalid." });
    }
    //Check user is unique or not
    const existinguser = await userModel.findOne({ email });
    //Existing user
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Registed with this email, Please login",
      });
    }

    //Register New user
    //Hash password
    const hashedPassword = await hashPassword(password);
    //save user data
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registeration is Successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation of inputs
    if (!email || !password) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid Email or Password" });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Email is not registered" });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid password" });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//Forget-Password Controller
export const forgetpasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer, phone } = req.body;
    //Validation of inputs
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    } else if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    } else if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    } else if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Entered Email is not Registered" });
    }

    if (!(answer === user.answer)) {
      return res.status(200).send({ success: false, message: "Wrong Answer" });
    } else if (!(phone === user.phone)) {
      return res
        .status(200)
        .send({ success: false, message: "Wrong Phone Number" });
    }

    const hashedpassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedpassword });
    res.status(200).send({
      success: true,
      message: "Password reset successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test Controller
export const testController = (req, res) => {
  try {
    res.send({
      name: "chethan",
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//Profile Upadte Controller
export const upadteProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

//Get Orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("furnitures", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting Orders",
      error,
    });
  }
};

//Get All Orders for Admin
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("furnitures", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting All Orders",
      error,
    });
  }
};

//Update Order
export const orderUpdateController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While updating order",
      error,
    });
  }
};
