import mongoose, { Schema } from "mongoose";

const iconCategories = mongoose.model(
  "iconCategories",
  new Schema({
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  })
);

export default iconCategories;
