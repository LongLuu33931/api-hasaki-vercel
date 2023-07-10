import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import session from "express-session";

import passport from "passport";
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
import connect from "./database/database.js";
import readme from "./global/readme.js";

import GoogleAuth from "./authentication/authGG.js";

const app = express();

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// app.use(checkToken);
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connect();
  console.log(`listening on port : ${port}`);
});

//swagger
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
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};
GoogleAuth();
const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routers
app.use("/api/product", productRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/icon-categories", iconCategoriesRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

//OAuth2 Google
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`hello ${req.user.displayName}`);
});

app.get("", async (req, res) => {
  res.send(readme);
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send("Goodbye");
});

app.get("/auth/failure", (req, res) => {
  res.send("something went wrong...");
});
