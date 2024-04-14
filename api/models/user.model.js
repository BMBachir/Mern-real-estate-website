import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
