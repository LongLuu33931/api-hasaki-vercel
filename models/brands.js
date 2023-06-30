import mongoose, { Schema } from "mongoose";

const Brands = mongoose.model(
  "brands",
  new Schema({
    url: {
      type: String,
      required: true,
    },
    img_brand: {
      type: String,
      required: true,
    },
  })
);

export default Brands;
