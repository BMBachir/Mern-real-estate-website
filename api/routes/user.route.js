import express from "express";
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
