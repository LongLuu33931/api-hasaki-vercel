import { detailOrder, Order } from "../models/index.js";

import { cartRepository } from "./index.js";

const checkOut = async ({ email_user, order_date, status }) => {
  try {
    const cart_result = await cartRepository.getCart(email_user);
    await Order.create({ email_user, order_date, status });
    const lastOrderQuery = Order.find().sort({ _id: -1 }).limit(1);
    const lastOrder = await lastOrderQuery.exec();
    const lastOrderId = lastOrder[0]._id.toString();
    const orderItem = [];
    cart_result.forEach((item) => {
      orderItem.push({
        order_id: lastOrderId,
        product_id: item.product_id,
        quantity: item.quantity,
      });
    });
    await detailOrder.insertMany(orderItem);
    await cartRepository.dropCart({ email_user });
  } catch (error) {
    throw new Error("Checking out failed " + error.message);
  }
};

const dropOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    if (!order && order.status != "Đã Hủy") {
      order.status = "Đã Hủy";
    }
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Dropping order failed " + error.message);
  }
};

export default {
  checkOut,
  dropOrder,
};
