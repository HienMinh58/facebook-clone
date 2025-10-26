import { where } from "sequelize";
import Like from "../models/like.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
export const likePost = async (req, res) => {
    try{
        const userId = req.user.id;
        const { postId } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid postId" });
        }
        
        const existingLike = await Like.findOne({where: { userId, postId }});
        if(existingLike) {
            return res.status(400).json({ message: "User have already liked this post." });
        }
        console.log("userId:", userId);
        console.log("postId:", postId);
        console.log("existingLike:", existingLike);
        const newLike = await Like.create({ userId, postId });

        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

        res.status(201).json({
            message: "Like successed.", 
            like: newLike
        })
    } catch(error) {
        console.log("Error when like post", error);
        res.status(500).json({message: "Server error"});
    }
};

export const unlikePost = async (req, res) => {
    try{
        const userId = req.user.id;
        const {  postId } = req.body;

        const existingLike = await Like.findOne({ where: { userId, postId } });
        if(!existingLike) {
            return res.status(400).json({ message: "User haven't liked this post."});
        }
        
        await Like.destroy({ where: { userId, postId } });

        await Post.findByIdAndUpdate(postId, { $inc: { like: -1 } });

        res.status(200).json({message: "Unlike successfully."});
    } catch(error) {
        console.log("error when unlike post", error.message);
        res.status(500).json({message: "Server error."});
    }
};

export const getLikesForPost = async (req, res) => {
    try{
        const { postId } = req.params;

        const likes = await Like.findAll({
            where: { postId },
            include: [{ model: User, attributes: ['id', 'username', 'email']}]
        });

        res.status(200).json({
            message: "Like list for post.",
            likes: likes.map(like => ({
                likeId: like.id,
                user: like.User
            }))
        })
    } catch(error) {
        console.error("Error when get like list", error);
        res.status(500).json({message: "Server error"});
    }
};

export const getUserLikes = async (req, res) => {
    try {
        const userId = req.user.id;

        const likes = await Like.findAll({ where: { userId }});
        const postIds = likes.map(like => like.postId);

        const posts = await Post.find({ _id: postIds });

        res.status(200).json({
            message: "liked post list.",
            posts
        });
    } catch(error) {
        console.error("Error when get user likes", error);
        res.status(500).json({ message: "Server error" });
    }
}