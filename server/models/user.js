import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    city: String,
    phoneNumber: String,
    occupation: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["Business Owner", "Super Admin"],
      default: "Business Owner",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
