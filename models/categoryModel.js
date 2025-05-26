// models/categoryModel.js
import mongoose from "mongoose";
import slugify from "slugify"; // You'll need to install slugify: npm install slugify

const categoryschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true, // Slugs should also be unique
    },
  },
  { timestamps: true } // Add timestamps for consistency
);

const Category = mongoose.model("Category", categoryschema);

// Function to create default categories if they don't exist
async function createDefaultCategories() {
  try {
    const defaultCategories = [
      "Sofas",
      "Beds",
      "Chairs",
      "Tables",
      "Wardrobes",
      "Bookcases",
      "Cabinets",
      "Desks",
      "Dining Sets",
      "Outdoor Furniture",
      "Kids Furniture",
    ];

    for (const categoryName of defaultCategories) {
      const existingCategory = await Category.findOne({ name: categoryName });
      if (!existingCategory) {
        const newCategory = new Category({
          name: categoryName,
          slug: slugify(categoryName), // Generate slug from name
        });
        await newCategory.save();
        console.log(`Default category "${categoryName}" created successfully!`);
      } else {
        // console.log(`Default category "${categoryName}" already exists.`); // Optional: uncomment if you want to see existing categories
      }
    }
  } catch (error) {
    console.error("Error creating default categories:", error);
  }
}

createDefaultCategories(); // Call the function to create default categories


export default Category; // Export the model
