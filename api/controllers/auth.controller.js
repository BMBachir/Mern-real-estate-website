import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // Create new user with default values for optional fields
  let newUser = new User({
    username: req.body.username || "", // Default to empty string if not provided
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar || "", // Default to empty string if not provided
  });

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }

    // Save the new user to the database
    await newUser.save();

    // Generate an access token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // Send response with token
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(error.status, error.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password")); // Changed status to 401 for invalid password
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }); // Set an expiration for security
    console.log("Generated Token:", token);

    // Send token as cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }) // Use secure flag in production
      .status(200)
      .json({
        message: "User logged in successfully",
        ...validUser._doc,
        password: undefined,
      }); // Hide password in response
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      let newUser = new User({
        username: req.body.name.split(" ").join(""),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo || "", // Ensure avatar field is included
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token"); // Clear the token cookie

    res
      .status(200)
      .json({ success: true, message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};
