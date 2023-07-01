import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connect from "./database/database.js";
import cors from "cors";
import {
  productRouter,
  brandsRouter,
  iconCategoriesRouter,
  userRouter,
  cartRouter,
} from "./routes/index.js";
import readme from "./global/readme.js";
import checkToken from "./authentication/auth.js";
const app = express();
app.use(cors());
// app.use(checkToken);
app.use(express.json());
const port = process.env.PORT || 3000;
//routers
app.use("/api/product", productRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/icon-categories", iconCategoriesRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
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
