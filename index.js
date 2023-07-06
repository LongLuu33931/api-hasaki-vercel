import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connect from "./database/database.js";
import cors from "cors";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {
  productRouter,
  brandsRouter,
  iconCategoriesRouter,
  userRouter,
  cartRouter,
  orderRouter,
} from "./routes/index.js";
import readme from "./global/readme.js";
import checkToken from "./authentication/auth.js";
const app = express();
app.use(cors());
// app.use(checkToken);
app.use(express.json());
const port = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for hasaki",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from Hasaki.",
    contact: {
      name: "Long Luu",
      url: "https://www.facebook.com/profile.php?id=100008254838333",
    },
  },
  servers: [
    {
      url: "https://determined-slug-turtleneck-shirt.cyclic.app/",
      description: "Deploy server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//routers
app.use("/api/product", productRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/icon-categories", iconCategoriesRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
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
