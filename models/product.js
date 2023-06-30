import mongoose, { Schema } from "mongoose";

const Product = mongoose.model(
  "products",
  new Schema({
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc_vn: {
      type: String,
      required: true,
    },
    desc_eng: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    discount: {
      type: String,
    },
    old_price: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    rates: {
      type: Number,
    },
    products_sold: {
      type: String,
    },
  })
);
export default Product;
