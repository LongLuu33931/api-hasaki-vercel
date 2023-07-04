import Exception from "../exceptions/exceptions.js";
import { Category } from "../models/index.js";

const insertCategory = async () => {
  await Category.insertMany();
};

const getAllCategory = async () => {
  const categories = await Category.find();

  return categories;
};

export default { insertCategory, getAllCategory };
