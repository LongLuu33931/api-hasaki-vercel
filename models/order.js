import mongoose, { Schema } from "mongoose";

const Order = mongoose.model(
  "Orders",
  new Schema({
    email_user: {
      type: String,
      required,
    },
    order_date: {
      type: Date,
      required,
    },
    total_amount: {
      type: Number,
      required,
    },
    status: {
      type: String,
    },
  })
);
