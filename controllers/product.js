import { productRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/httpStatusCode.js";

import { MAX_RECORDS } from "../global/constants.js";

const getAllProduct = async (req, res) => {
  try {
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;
    let filteredProduct = await productRepository.getAllProduct({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "get all product successfully",
      size: filteredProduct.length,
      page,
      searchString,
      data: filteredProduct,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const insertProduct = async (req, res) => {
  try {
    const product = await productRepository.insertProduct();
    res.status(HttpStatusCode.OK).json({
      message: "insert user successfully",
      data: product,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

export default {
  getAllProduct,
  insertProduct,
};
