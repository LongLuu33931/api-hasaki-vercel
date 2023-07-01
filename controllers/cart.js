import { cartRepository } from "../repositories/index.js";
import httpStatusCode from "../exceptions/httpStatusCode.js     ";

const addToCart = async (req, res) => {
  try {
    const item = req.body;

    await cartRepository.addToCart(item);
    res.status(httpStatusCode.INSERT_OK).json({
      message: "add to cart successfully",
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot add to cart " + error,
      validationErrors: error.validationErrors,
    });
  }
};

const getCart = async (req, res) => {
  const { email_user } = req.body;
  try {
    const cart = await cartRepository.getCart(email_user);
    debugger;
    res.status(httpStatusCode.OK).json({
      message: "get cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot get cart " + error,
      validationErrors: error.validationErrors,
    });
  }
};

const updateCart = async (req, res) => {
  const { email_user, product_id, quantity } = req.body;
  try {
    await cartRepository.updateCart(req.body);
    res.status(httpStatusCode.OK).json({
      message: "update cart item successfully",
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot update cart item " + error,
      validationErrors: error.validationErrors,
    });
  }
};

const deleteCartItem = async (req, res) => {
  const { email_user, product_id } = req.body;
  try {
    await cartRepository.deleteCartItem(req.body);
    res.status(httpStatusCode.OK).json({
      message: "delete item successfully",
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot delete cart item " + error.message,
    });
  }
};

const dropCart = async (req, res) => {
  const { email_user } = req.body;
  try {
    await cartRepository.dropCart(req.body);
    res.status(httpStatusCode.OK).json({
      message: "drop cart successfully",
    });
  } catch (error) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot drop cart " + error.message,
    });
  }
};

export default { addToCart, getCart, updateCart, deleteCartItem, dropCart };
