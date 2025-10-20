import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { createUser, getUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/login', getUser);

router.post('/register', createUser);

router.get('/profile', verifyToken, (req, res) => {
    if(!req.user || !req.user.username) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    return res.status(200).json({
        success: true,
        message: 'Profile accessed successfully',
        data: {
        username: req.user.username,
        id: req.user.id,
        },
    });
})

export default router;