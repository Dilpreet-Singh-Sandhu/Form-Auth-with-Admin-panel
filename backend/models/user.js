import mongoose from "mongoose";
import validator from "validator";

const userSechmea = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot be more than 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 6 characters long']
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSechmea);

export default UserModel;
