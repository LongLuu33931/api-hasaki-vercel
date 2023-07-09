import mongoose, { Schema } from "mongoose";

const Order = mongoose.model(
  "Orders",
  new Schema({
    email_user: {
      type: String,
      required: true,
    },
    order_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  })
);

export default Order;
