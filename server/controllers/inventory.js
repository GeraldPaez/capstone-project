// import Inventory from "../models/inventory.js";
import ProductItems from "../models/items.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductItems.find();
    const totalQuantity = await calculateTotalQuantity();

    res.status(200).json(products, totalQuantity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new function to calculate the total quantity
export const calculateTotalQuantity = async () => {
  try {
    const allProductItems = await ProductItems.find();
    const totalQuantity = allProductItems.reduce(
      (total, productItem) => total + productItem.quantity,
      0
    );
    return totalQuantity;
  } catch (error) {
    throw error;
  }
};

export const getTotalQuantity = async (req, res) => {
  try {
    const totalQuantity = await calculateTotalQuantity();
    res.status(200).json({ totalQuantity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const products = await ProductItems.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postItems = async (req, res) => {
  try {
    const { name, units, quantity, price } = req.body;
    const newProduct = new ProductItems({ name, units, quantity, price });

    const products = await newProduct.save();
    res
      .status(200)
      .json({ message: "Successfully added new record", result: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const id = req.params.id;

    const products = await ProductItems.findById(id);

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product successfully found", products: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const putItems = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, units, quantity, price } = req.body;
    const products = await ProductItems.findByIdAndUpdate(
      id,
      { name, units, quantity, price },
      { new: true }
    );

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product successfully updated", result: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const id = req.params.id;

    const products = await ProductItems.findByIdAndDelete(id);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
};
