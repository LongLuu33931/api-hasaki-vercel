import HttpStatusCode from "../exceptions/httpStatusCode.js";
import { iconCategoriesRepository } from "../repositories/index.js";

const insertIconCategories = async (req, res) => {
  await iconCategoriesRepository.insertIconCategories();
  res.status(HttpStatusCode.OK).json({
    message: "insert icon categories successfully",
  });
};

const getAllIconCategories = async (req, res) => {
  const data = await iconCategoriesRepository.getAllIconCategories();

  res.status(HttpStatusCode.OK).json({
    message: "get all icon categories successfully",
    data: data,
  });
};

export default {
  insertIconCategories,
  getAllIconCategories,
};
