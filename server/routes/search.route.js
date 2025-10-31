import { verifyToken } from "../middleware/authMiddleware.js";
import express from "express";
import { getUserByName } from "../controller/user.controller.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", getUserByName);

export default router;