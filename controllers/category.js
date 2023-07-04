import { categoryRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/httpStatusCode.js";
import product from "../repositories/product.js";

const insertCategory = async (req, res) => {
  try {
    const category = await categoryRepository.insertCategory();
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "add category successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "get categories failed",
    });
  }
};
const arr = [];
for (let i = 0; product.length; i++) {
  if (!arr.includes(product[i])) {
    arr.push(product[i]);
  }
}

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryRepository.getAllCategory();
    res.status(HttpStatusCode.OK).json({
      message: "get categories successfully",
      data: categories,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "get categories failed",
    });
  }
};
