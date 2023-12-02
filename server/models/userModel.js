import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      validate: {
        validator: function (value) {
          // Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
          );
        },
        message: (props) =>
          `${props.value} is not a valid password. It should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
      },
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
    role: {
      type: String,
      enum: ["Business Owner", "Manager", "Super Admin"],
      default: "Business Owner",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);
export default Users;
