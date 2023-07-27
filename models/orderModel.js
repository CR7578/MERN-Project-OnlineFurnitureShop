import mongoose from "mongoose";

const orderschema = new mongoose.Schema(
  {
    furnitures: [
      {
        type: mongoose.ObjectId,
        ref: "furnitures",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderschema);
