// models/userModel.js
import mongoose from "mongoose";
import { hashPassword } from "../helpers/authHelper.js"; // Import your hashPassword helper

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: {}, // Consider defining a more specific schema for address if needed
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0, // 0 for regular user, 1 for admin
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userschema);

// Function to create default users if they don't exist
// This function now uses your hashPassword helper
async function createDefaultUsers() {
  try {
    // Check for admin user
    const adminUser = await User.findOne({ email: "admin@gmail.com" });
    if (!adminUser) {
      const hashedPassword = await hashPassword("admin@123"); // Hash admin password
      const newAdmin = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        phone: "1234567890",
        address: { street: "Admin Street", city: "Admin City" },
        answer: "Admin",
        role: 1, // Admin role
      });
      await newAdmin.save();
      console.log("Admin user created successfully!");
    } else {
      console.log("Admin user already exists.");
    }

    // Check for regular user
    const regularUser = await User.findOne({ email: "user@gmail.com" });
    if (!regularUser) {
      const hashedPassword = await hashPassword("user@123"); // Hash regular user password
      const newUser = new User({
        name: "User",
        email: "user@gmail.com",
        password: hashedPassword,
        phone: "0987654321",
        address: { street: "User Avenue", city: "User City" },
        answer: "User",
        role: 0, // Regular user role
      });
      await newUser.save();
      console.log("Regular user created successfully!");
    } else {
      console.log("Regular user already exists.");
    }
  } catch (error) {
    console.error("Error creating default users:", error);
  }
}

createDefaultUsers(); // Call the function to create default users

export default User; // Export the model
