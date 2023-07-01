import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export const User = mongoose.model(
  "Users",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true, //not null,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Nam", "Nữ", "Không xác định"],
        message: "{VALUE} is not supported",
      },
    },
    birthday: {
      type: String,
      required: true,
    },
  })
);

export default User;
