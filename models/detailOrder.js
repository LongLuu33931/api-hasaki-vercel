import mongoose, { Schema } from "mongoose";

const detailOrder = mongoose.model(
  "detailOrder",
  new Schema({
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    product_id: { type: Number, ref: "products", required: true },
    quantity: { type: Number, required: true },
  })
);

export default detailOrder;
