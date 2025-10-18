import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts});
    } catch (error) {
        console.log("error in fetching posts:", error.message);
        res.status(500).json( {succes: false, message: "Server error" });
    }
};

export const createPosts = async (req, res) => {
    const post = req.body;

    if(!post.text) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newPost = new Post(post)

    try {
        await newPost.save();
        res.status(201).json({ success: true, data: newPost});
    } catch (error) {
        console.error("Error in Create post:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}