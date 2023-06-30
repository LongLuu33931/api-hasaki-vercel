import Exception from "../exceptions/exceptions.js";
import { brandsData } from "../mock-data/index.js";

import { Brands } from "../models/index.js";

const insertBrands = async () => {
  await Brands.insertMany(brandsData);
};

export default {
  insertBrands,
};
