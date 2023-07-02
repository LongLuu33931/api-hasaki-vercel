import { Product } from "../models/index.js";

import Exception from "../exceptions/exceptions.js";
import { productsData } from "../mock-data/index.js";

const getAllProduct = async ({ page, size, searchString }) => {
  page = parseInt(page);
  size = parseInt(size);

  let filteredProduct = await Product.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" },
            brand: { $regex: `.*${searchString}.*`, $options: "i" },
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    { $limit: size },
  ]);
  return filteredProduct;
};

const insertProduct = async () => {
  console.log("insert product");
  try {
    await Product.insertMany(productsData);
  } catch (error) {
    if (!!error.errors) {
      throw new Exception("Input error", error.errors);
    }
  }
};

const detailProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Exception("Cannot find product with id: " + id);
  }
  return product;
};
export default { getAllProduct, insertProduct, detailProduct };
