import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    date: Date,
    name: String,
    units: String,
    quantity: Number,
    price: Number,
    total: Number,
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;