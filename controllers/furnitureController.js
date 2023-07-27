import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import furnitureModel from "../models/furnitureModel.js";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

//Payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createFurnitureController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, ratings } =
      req.fields;
    const { photo } = req.files;

    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and Should be less then  1mb" });
    }
    const furnitures = new furnitureModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      furnitures.photo.data = fs.readFileSync(photo.path);
      furnitures.photo.contentType = photo.type;
    }
    await furnitures.save();
    res.status(200).send({
      success: true,
      message: "Furniture Created Successfull",
      furnitures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Furniture",
      error,
    });
  }
};

export const updateFurnitureController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, ratings } =
      req.fields;
    const { photo } = req.files;

    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and Should be less then  1mb" });
    }
    const furnitures = await furnitureModel.findByIdAndUpdate(
      req.params.fid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      furnitures.photo.data = fs.readFileSync(photo.path);
      furnitures.photo.contentType = photo.type;
    }
    await furnitures.save();
    res.status(200).send({
      success: true,
      message: "Furniture Updated Successfull",
      furnitures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Updating Furniture",
      error,
    });
  }
};

export const getFurnitureController = async (req, res) => {
  try {
    const furnitures = await furnitureModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: furnitures.length,
      message: "All Furniture",
      furnitures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Furniture",
      error,
    });
  }
};

export const getSingleFurnitureController = async (req, res) => {
  try {
    const furniture = await furnitureModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Furniture",
      furniture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Single Furniture",
      error,
    });
  }
};

export const furniturePhotoController = async (req, res) => {
  try {
    const furniture = await furnitureModel
      .findById(req.params.fid)
      .select("photo");
    if (furniture.photo.data) {
      res.set("Content-type", furniture.photo.contentType);
      return res.status(200).send(furniture.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Furniture Photo",
      error,
    });
  }
};

export const deleteFurnitureController = async (req, res) => {
  try {
    await furnitureModel.findByIdAndDelete(req.params.fid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Furniture Deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleteing Furniture",
      error,
    });
  }
};

export const filtersFurnitureController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const furnitures = await furnitureModel.find(args);
    res.status(200).send({
      success: true,
      total: furnitures.length,
      furnitures,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Filtering Furnitures",
      error,
    });
  }
};

//Furniture count
export const furnitureCountController = async (req, res) => {
  try {
    const total = await furnitureModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Something went wrong in Furniture count",
      });
  }
};

// Get furniture list based on page
export const furnitureListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const furnitures = await furnitureModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      furnitures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong in Furniture list",
    });
  }
};

//Search Furnitures
export const furnitureSearchController = async (req, res) => {
  try {
    const { keywords } = req.params;
    const result = await furnitureModel
      .find({
        $or: [
          { name: { $regex: keywords, $options: "i" } },
          { descripton: { $regex: keywords, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong in Search Furniture",
    });
  }
};

//Related Furniture Category
export const relatedFurnitureController = async (req, res) => {
  try {
    const { fid, cid } = req.params;
    const furnitures = await furnitureModel
      .find({
        category: cid,
        _id: { $ne: fid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      furnitures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong in related Furniture",
    });
  }
};

//Furnitures by category
export const furnitureCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const furnitures = await furnitureModel
      .find({ category })
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      furnitures,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong in  Furniture category",
    });
  }
};

//Payment Gateway API

//Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//Payment API
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            furnitures: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const quantityController = async (req, res) => {
  try {
    const { cart } = req.body;
    const updatedFurniture = [];

    for (const item of cart) {
      const { _id, quantity } = item;
      const updatedQuantity = quantity - 1;

      const furniture = await furnitureModel.findByIdAndUpdate(
        _id,
        { quantity: updatedQuantity },
        { new: true }
      );

      updatedFurniture.push(furniture);
    }

    res.status(200).send({
      success: true,
      message: "Furniture Updated Successfully",
      // updatedFurniture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to update furniture quantity",
      error: error.message,
    });
  }
};
