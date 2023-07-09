import mongoose from "mongoose";
import { detailOrder, Order } from "../models/index.js";

import { cartRepository } from "./index.js";
import Exception from "../exceptions/exceptions.js";

const checkOut = async ({
  email_user,
  order_date,
  status,
  address,
  phone_number,
}) => {
  try {
    const cart_result = await cartRepository.getCart(email_user);
    await Order.create({
      email_user,
      order_date,
      status,
      address,
      phone_number,
    });
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

const dropOrder = async ({ id, email_user }) => {
  try {
    const order = await Order.findOne({
      _id: id,
      email_user: email_user,
      status: { $ne: "Đã Hủy" }, // Ensures that the order status is not "Đã Hủy"
    });

    if (order) {
      order.status = "Đã Hủy";
      await order.save();
      console.log("Order dropped successfully");
    } else {
      console.log("Order not found or already cancelled");
    }
    return order;
  } catch (error) {
    throw new Error("Dropping order failed: " + error.message);
  }
};

const getDetailOrder = async (order_id) => {
  try {
    const result = await detailOrder.aggregate([
      {
        $match: {
          order_id: new mongoose.Types.ObjectId(order_id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "order_id",
          foreignField: "_id",
          as: "order",
        },
      },
    ]);
    // const result = await detailOrder.aggregate([
    //   {
    //     $match: {
    //       order_id: `${order_id}`,
    //     },
    //   },
    // ]);
    // const result = await detailOrder.find({ order_id });
    return result;
  } catch (error) {
    throw new Error("finding detail order error: " + error.message);
  }
};

const getOrder = async (email_user) => {
  try {
    const result = await Order.find({ email_user });
    if (result.length !== 0) {
      return result;
    }
  } catch (error) {
    throw new Exception("cannot find order with " + email_user);
  }
};

export default {
  checkOut,
  dropOrder,
  getDetailOrder,
  getOrder,
};
