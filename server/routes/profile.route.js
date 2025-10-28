import { verifyToken } from "../middleware/authMiddleware.js";
import express from "express";
import { createProfile, getProfile, getCurrentUserProfile ,updateProfile, addPostToProfile, addFriendToProfile } from "../controller/profile.controller.js";
import { get } from "aws-amplify/api/server";

const router = express.Router();

router.use(verifyToken);

router.post('/', createProfile);
router.get('/', getCurrentUserProfile);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.post('/add-post', addPostToProfile);
router.post('/add-friend', addFriendToProfile);

export default router;