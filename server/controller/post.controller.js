import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts});
    } catch (error) {
        console.log("error in fetching posts:", error.message);
        res.status(500).json( {success: false, message: "Server error" });
    }
};
export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({success: false, message: 'Server error'});
    }
}
export const createPosts = async (req, res) => {
    const { text, img } = req.body;

    if (!text) { 
        return res.status(400).json({ success: false, message: "Text field is required" });
    }
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "User authentication required" });
    }
    const userId = req.user.id;

    const newPost = new Post({
        text,
        img,
        userId
    })

    try {
        await newPost.save();
        res.status(201).json({ success: true, data: newPost});
    } catch (error) {
        console.error("Error in Create post:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}