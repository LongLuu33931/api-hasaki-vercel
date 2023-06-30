import mongoose, { Schema } from "mongoose";

const iconCategories = mongoose.model(
  "iconCategories",
  new Schema({
    _id: { type: Number, required: true },
    image_url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  })
);

export default iconCategories;
