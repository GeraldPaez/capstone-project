import ProductItems from "../models/items.js";

import express from "express";

import {
  getProducts,
  getItems,
  postItems,
  getItem,
  putItems,
  deleteItems,
} from "../controllers/inventory.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/items", getItems);
router.post("/items", postItems);
router.get("/items/:id", getItem);
router.put("/items/:id", putItems);
router.delete("/items/:id", deleteItems);

router.get("/inventory/items", async (req, res) => {
  try {
    const products = await ProductItems.find();
    res
      .status(200)
      .json({ message: "Successfully retrieved records", products: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/inventory/items", async (req, res) => {
  try {
    const { name, units, quantity, price } = req.body;
    const newProduct = new ProductItems({ name, units, quantity, price });

    const product = await newProduct.save();
    res
      .status(201)
      .json({ message: "Successfully added new record", result: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/inventory/items/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await ProductItems.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product successfully found", product: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/inventory/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, units, quantity, price } = req.body;
    const product = await ProductItems.findByIdAndUpdate(
      id,
      { name, units, quantity, price },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product successfully updated", result: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/inventory/items/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await ProductItems.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
