import { cartRepository, orderRepository } from "../repositories/index.js";

import httpStatusCode from "../exceptions/httpStatusCode.js";

const checkOut = async (req, res) => {
  try {
    const email_user = req.body.email_user;
    const cart = await cartRepository.getCart(email_user);
    if (cart.length !== 0) {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const year = currentDate.getFullYear().toString();

      const order_date = `${day}/${month}/${year}`;

      const status = "Đang Xử Lý";
      const address = req.body.address;
      const phone_number = req.body.phone_number;

      await orderRepository.checkOut({
        email_user,
        order_date,
        status,
        phone_number,
        address,
      });
      res.status(httpStatusCode.OK).json({
        message: "check out successfully",
      });
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "cannot check out",
      });
    }
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot check out " + error,
      validationErrors: error.validationErrors,
    });
  }
};

const dropOrder = async (req, res) => {
  try {
    const { id, email_user } = req.body;
    const result = await orderRepository.dropOrder(req.body);
    if (result.length !== 0) {
      res.status(httpStatusCode.OK).json({
        message: "drop order successfully",
      });
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "cannot drop order",
      });
    }
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot drop order " + error,
    });
  }
};

const detailOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const result = await orderRepository.getDetailOrder(order_id);
    if (result.lenght !== 0) {
      res.status(httpStatusCode.OK).json({
        message: "get detail order successfully",
        data: result,
      });
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "cannot get detail order",
      });
    }
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot get detail order" + error,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const email_user = req.params.email_user;
    const result = await orderRepository.getOrder(email_user);
    if (result.length !== 0) {
      res.status(httpStatusCode.OK).json({
        message: "get order successfully with " + email_user,
        data: result,
      });
    } else {
      res.status(httpStatusCode.BAD_REQUEST).json({
        message: "cannot get order with " + email_user,
      });
    }
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message.toString(),
    });
  }
};

export default {
  checkOut,
  dropOrder,
  detailOrder,
  getOrder,
};
