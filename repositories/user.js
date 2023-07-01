import Exception from "../exceptions/exceptions.js";
import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  // print("login user in user repository", OutputType.INFORMATION);
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    //not encrypt password !
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      //create JWT
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30 days",
          // expiresIn: "60",
        }
      );
      return {
        ...existingUser.toObject(),
        password: "not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.CANNOT_LOGIN);
    }
  } else {
    throw new Exception(Exception.CANNOT_LOGIN);
  }
};

const register = async ({ name, email, password, gender, birthday }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    //encrypt password, use bcrypt
    //use for login
    // const isMatched = await bcrypt.compare(password, existingUser.password);
    // if(isMatched) {

    // }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      birthday,
    });
    return { ...newUser._doc, password: "not show" };
  } catch (exception) {
    //check model validation here
    throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
};

const detailUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Exception("Cannot find user with id " + userId);
  }
  return { ...user._doc, password: "hidden" };
};

const updateUser = async ({ id, email, gender, name, birthday }) => {
  try {
    debugger;
    const user = await User.findById(id);
    if (user != null) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.gender = gender ?? user.gender;
      user.birthday = birthday ?? user.birthday;
      await user.save();
      return { ...user._doc, password: "hidden" };
    } else {
      throw new Exception("Cannot find user with id " + id);
    }
  } catch (error) {
    throw new Exception(Exception.CANNOT_UPDATE_USER_INFO);
  }
};

export default {
  login,
  register,
  detailUser,
  updateUser,
};
