import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(402, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token Verification Error:", err);
      return next(errorHandler(403, "Forbidden"));
    }
    console.log("Verified User:", user);
    req.user = user;
    next();
  });
};
