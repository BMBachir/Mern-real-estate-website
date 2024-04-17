import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  try {
    await newUser.save();
    res
      .status(201)
      .json({ user: newUser, message: "User created seccessfully..." });
  } catch (error) {
    next(errorHandler(error.status, error.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(404, "Invalid Password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json("User logged in successfully");
  } catch (error) {
    next(error);
  }
};
