import { iconCategoriesData } from "../mock-data/index.js";

import { iconCategories } from "../models/index.js";

const insertIconCategories = async () => {
  await iconCategories.insertMany(iconCategoriesData);
};

const getAllIconCategories = async () => {
  const data = await iconCategories.find();
  return data;
};

export default {
  insertIconCategories,
  getAllIconCategories,
};
