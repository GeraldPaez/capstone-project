import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    ProdID: String,
    Date: String,
    Name: String,
    Unit: String,
    Quantity: Number,
    Price: Number,
    Total: Number,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
