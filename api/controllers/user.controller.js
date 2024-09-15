import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const test = async (req, res) => {
  res.send("Tested succesfully..");
};

export const updateUser = async (req, res, next) => {
  // Authorization check: user can only update their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    // Update password if provided
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password, // Fixed typo here
          avatar: req.body.avatar,
        },
      },
      { new: true } // Return the updated document
    );

    // Remove password from the response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Authorization check: user can only delete their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
    // Delete user by ID
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
