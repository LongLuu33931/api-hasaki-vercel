import mongoose, { Schema } from "mongoose";

const suggestionCategories = mongoose.model(
  "suggestionCategories",
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

export default suggestionCategories;
