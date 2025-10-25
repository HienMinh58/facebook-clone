import express from "express";
import { likePost, unlikePost, getLikesForPost, getUserLikes } from "../controller/like.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(verifyToken)

router.post("/", likePost);
router.delete("/:userId/:postId", unlikePost);
router.get("/post/:postId", getLikesForPost);
router.get("/user/:userId", getUserLikes);

export default router;