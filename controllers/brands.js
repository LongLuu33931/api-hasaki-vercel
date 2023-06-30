import HttpStatusCode from "../exceptions/httpStatusCode.js";
import { brandsRepository } from "../repositories/index.js";

const insertBrands = async (req, res) => {
  const brands = await brandsRepository.insertBrands(req.body);
  res.status(HttpStatusCode.INSERT_OK).json({
    message: "insert brands successfully",
  });
};

export default {
  insertBrands,
};
