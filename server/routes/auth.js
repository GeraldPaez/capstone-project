import express from "express";
import { login } from "../controllers/auth.js";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/:id", verifyToken, getUser);

export default router;
