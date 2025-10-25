import express from "express";
import { getPosts, createPosts, getPost } from "../controller/post.controller.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", createPosts);

export default router;