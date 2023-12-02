import mongoose from "mongoose";

const ProductItemSchema = new mongoose.Schema(
  {
    name: String,
    units: String,
    quantity: Number,
    price: Number,
  },
  { timestamps: true }
);

const ProductItems = mongoose.model("ProductItems", ProductItemSchema);
export default ProductItems;
