import mongoose, { Schema } from "mongoose";

const Cart = mongoose.model(
  "cart",
  new Schema({
    email_user: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    desc_vn: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  })
);

export default Cart;
