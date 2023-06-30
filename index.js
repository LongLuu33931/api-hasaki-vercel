import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connect from "./database/database.js";
import {
  productRouter,
  brandsRouter,
  iconCategoriesRouter,
} from "./routes/index.js";
import readme from "./global/readme.js";
// import checkToken from "./authentication/auth.js";
const app = express();
// app.use(checkToken);
app.use(express.json());
const port = process.env.PORT || 3000;
//routers
app.use("/api/product", productRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/icon-categories", iconCategoriesRouter);
// app.use("/icon-categories", studentsRouter);
// app.use("/suggestion-categories", studentsRouter);
// app.use("/slide", studentsRouter);
app.use("", async (req, res) => {
  res.send(readme);
});

app.listen(port, async () => {
  await connect();
  console.log(`listening on port : ${port}`);
});
