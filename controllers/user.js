import { EventEmitter } from "node:events";
import { body, validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/httpStatusCode.js";
import { userRepository } from "../repositories/index.js";

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (param) => {
  console.log(`they talked about: ${JSON.stringify(param)}`);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login successfully",
      data: existingUser,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
};

const register = async (req, res) => {
  const email = req.body.email;
  const gender = req.body.gender;
  const password = req.body.password;
  const name = req.body.name;
  const date = req.body.date;
  const month = req.body.month;
  const year = req.body.year;
  const birthday = `${date}/${month}/${year}`;
  debugger;
  //destructuring

  //Event Emitter
  myEvent.emit("event.register.user", { email });
  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      gender,
      birthday,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "register user successfully",
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot register " + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const detailUser = async (req, res) => {
  try {
    let userId = req.params.id.toString();
    console.log(userId);
    debugger;
    const user = await userRepository.detailUser(userId);
    res.status(HttpStatusCode.OK).json({
      message: "get detail user successfully",
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot find this user " + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const gender = req.body.gender;
  const name = req.body.name;
  const date = req.body.date;
  const month = req.body.month;
  const year = req.body.year;
  const birthday = `${date}/${month}/${year}`;
  try {
    const existingUser = await userRepository.detailUser(id);
    if (existingUser != null) {
      const updateUser = await userRepository.updateUser({
        id,
        email,
        gender,
        name,
        birthday,
      });
      res.status(HttpStatusCode.OK).json({
        message: "update user successfully",
        data: updateUser,
      });
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: "user is not exist",
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "cannot update user " + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default {
  login,
  register,
  detailUser,
  updateUser,
};
