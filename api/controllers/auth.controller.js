import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  try {
    await newUser.save();
    res.json(newUser);
    res.status(201).json("User created seccessfully...");
  } catch (error) {
    next(errorHandler(error.status, error.message));
  }
};
