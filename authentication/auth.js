import HttpStatusCode from "../exceptions/httpStatusCode.js";
import jwt from "jsonwebtoken";
import userAccessToken from "../models/userAccessToken.js";
export default function checkToken(req, res, next) {
  //bypass login, register
  if (
    req.url.toLowerCase().trim() == "/api/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/api/users/register".toLowerCase().trim()
  ) {
    next();
    return;
  }
  //other requests
  //get and validate token
  const token = req.headers?.authorization?.split(" ")[1];
  const UAT = userAccessToken.findOne({ token }).exec();
  console.log(typeof UAT);
  debugger;
  if (Object.keys(UAT).length === 0) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      next();
      return;
    }
  } catch (exception) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
