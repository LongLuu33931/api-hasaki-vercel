import mongoose, { Schema } from "mongoose";

const Category = mongoose.model(
  "category",
  new Schema({
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  })
);

export default Category;
