import { Cart } from "../models/index.js";
import Exception from "../exceptions/exceptions.js";

const addToCart = async (data) => {
  try {
    for (let i = 0; i < data.length; i++) {
      let email_user = data[i].email_user;
      let product_id = data[i].product_id;
      const existingCartItem = await Cart.findOne({
        $and: [{ email_user }, { product_id }],
      });
      debugger;
      if (existingCartItem != null) {
        existingCartItem.quantity =
          existingCartItem.quantity + data[i].quantity ??
          existingCartItem.quantity;
        await existingCartItem.save();
      } else {
        await Cart.create(data[i]);
      }
    }
    // await Cart.insertMany(data);
  } catch (error) {
    if (!!error.errors) {
      throw new Exception("Input error", error.errors);
    }
  }
};

const getCart = async (email_user) => {
  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          email_user: `${email_user}`,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "COMMON",
        },
      },
    ]);

    return cart;
  } catch (error) {
    throw new Error("Error retrieving cart items: " + error.message);
  }
};

const updateCart = async ({ email_user, product_id, quantity }) => {
  try {
    const cartItem = await Cart.findOne({
      $and: [{ email_user }, { product_id }],
    });

    debugger;
    if (cartItem != null) {
      cartItem.quantity = quantity ?? cartItem.quantity;
      await cartItem.save();
    }
  } catch (error) {
    throw new Error("Cannot update cart items: " + error.message);
  }
};

const deleteCartItem = async ({ email_user, product_id }) => {
  try {
    const deletedItem = await Cart.deleteOne({ email_user, product_id });
    if (deletedItem.deletedCount < 0) {
      return json({
        message: "item not found",
      });
    } else {
      return json({
        message: "got'em",
      });
    }
  } catch (error) {
    throw new Error("Error deleting cart item: ", error);
  }
};

const dropCart = async ({ email_user }) => {
  try {
    await Cart.deleteMany({ email_user });
  } catch (error) {
    throw new Error("Error dropping cart: ", error);
  }
};

export default { addToCart, getCart, updateCart, deleteCartItem, dropCart };
