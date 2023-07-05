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

      await orderRepository.checkOut({
        email_user,
        order_date,
        status,
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
    const id = req.body.id;
    const result = await orderRepository.dropOrder(id);
    if (!result) {
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

export default {
  checkOut,
  dropOrder,
};
