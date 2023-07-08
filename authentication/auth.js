import HttpStatusCode from "../exceptions/httpStatusCode.js";
import jwt from "jsonwebtoken";
import userAccessToken from "../models/userAccessToken.js";

export default async function checkToken(req, res, next) {
  // Bypass login and register
  if (
    req.url.toLowerCase().trim() === "/api/users/login" ||
    req.url.toLowerCase().trim() === "/api/users/register"
  ) {
    next();
    return;
  }

  // Other requests
  // Get and validate token
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    const UAT = await userAccessToken.findOne({ token }).exec();
    if (Object.keys(UAT).length === 0) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    if (isExpired) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token is expired",
      });
    }

    next();
  } catch (exception) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
