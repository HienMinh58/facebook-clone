import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

export const createUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if(!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            email,
            passwordHash,
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
            },
        });   
    } catch(error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists",
            });
        }
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the user",
            error: error.message,
        });
    }
};

export const getUser = async (req, res) => {
    const { password, email } = req.body;
    if(!password || (!email)) {
        return res.status(400).json({ success: false, message: "email and password are required" });
    }
    try {
        const whereClause = {};
        if (email) {
            whereClause.email = email;
        }
        const user = await User.findOne({ where: whereClause });

        if(!user) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour; adjust as needed
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during user verification",
            error: error.message,
        });
    }
};

export const getUserByName = async (req, res) => {
    const username = req.body?.name?.trim();
    if (!username) {
        return res.status(400).json({ 
            success: false, 
            message: "Name is required" 
        });
    }
    try {
        const whereClause = { username };

        const users = await User.findAll({where: whereClause,
            limit: 10
        });
        if(!users) {
            return res.status(404).json({success: false, message: "Cannot found username"});
        }

        return res.status(200).json({
            success: true,
            data: users.map((u) => u.username)
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "An error occur while search for user",
            error: error.message,
        });
    }
};