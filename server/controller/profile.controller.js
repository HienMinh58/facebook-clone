import Profile from "../models/profile.model.js";

import Post from "../models/post.model.js";
import { Op } from "sequelize";
import { User, Friendship } from "../models/index.js"
export const createProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const existingProfile = await Profile.findOne({ where: { userId } });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Profile already exists" });
        }
        
        const profile = await Profile.create({
            userId,
            profile_name: user.username, // Initialize from user's username
            posts: [],
            friends: [],
        });
        res.status(201).json({ success: true, message: "Profile created successfully", data: profile });
    } catch(error) {
        next(error);
    }
};
    export const getCurrentUserProfile = async (req, res, next) => {
        try {
            const userId = req.user.id;
            

            const profile = await Profile.findOne({
                where: { userId },
                include: [{ model: User, attributes: ['username', 'email'] }],
            });
            if (!profile) {
                return res.status(404).json({ success: false, message: "Profile not found" });
            }

            const posts = await Post.find({ userId }).sort({ createdAt: -1 }).limit(10);
            const users = await User.findAll({ attributes: ['id', 'username'] });
            const userMap = new Map(users.map(user => [user.id, user.username]));
            const postsWithUserName = posts.map(post => ({
                id: post._id,
                text: post.text,
                img: post.img,
                likes: post.likes,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                userId: post.userId,
                username: userMap.get(post.userId) || 'Unknown username'
            }));
            const friends = await Friendship.findAll({
                where: {
                    [Op.or]: [
                        { userId, status: 'accepted' },
                        { friendId: userId, status: 'accepted' },
                    ],
                },
                include: [
                    { model: User, as: 'friend', attributes: ['id', 'username'] },
                    { model: User, as: 'user', attributes: ['id', 'username'] },
                ],
            });

            const friendList = friends.map(friendship => {
                if (friendship.userId === userId) {
                    return { id: friendship.friendId, username: friendship.friend.username };
                } else {
                    return { id: friendship.userId, username: friendship.user.username };
                }
            });

            return res.status(200).json({
                success: true,
                message: "Profile retrieved successfully",
                data: {
                    ...profile.toJSON(),
                    postsWithUserName,
                    friends: friendList,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    export const getProfile = async (req, res, next) => {
        try {
            const userId = req.params.id;
            

            const profile = await Profile.findOne({
                where: { userId },
                include: [{ model: User, attributes: ['username', 'email'] }],
            });
            if (!profile) {
                return res.status(404).json({ success: false, message: "Profile not found" });
            }

            const posts = await Post.find({ userId }).sort({ createdAt: -1 }).limit(10);

            const friends = await Friendship.findAll({
                where: {
                    [Op.or]: [
                        { userId, status: 'accepted' },
                        { friendId: userId, status: 'accepted' },
                    ],
                },
                include: [
                    { model: User, as: 'friend', attributes: ['id', 'username'] },
                    { model: User, as: 'user', attributes: ['id', 'username'] },
                ],
            });

            const friendList = friends.map(friendship => {
                if (friendship.userId === userId) {
                    return { id: friendship.friendId, username: friendship.friend.username };
                } else {
                    return { id: friendship.userId, username: friendship.user.username };
                }
            });

            return res.status(200).json({
                success: true,
                message: "Profile retrieved successfully",
                data: {
                    ...profile.toJSON(),
                    posts,
                    friends: friendList,
                },
            });
        } catch (error) {
            next(error);
        }
    };
/**
 * Update the authenticated user's profile.
 * Only allows updates to own profile.
 * Requires authentication via verifyToken middleware.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateProfile = async (req, res, next) => {
    try {
        const { id: paramId } = req.params;
        const userId = paramId || req.user.id; // Use param if provided, but check ownership
        const { pfp, profile_name } = req.body;

        // Enforce ownership: only allow update if matches authenticated user
        if (paramId && paramId !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to update this profile" });
        }

        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        // Update fields if provided
        if (pfp !== undefined) profile.pfp = pfp;
        if (profile_name !== undefined) profile.profile_name = profile_name;

        await profile.save();

        res.status(200).json({ success: true, message: "Profile updated successfully", data: profile });
    } catch (error) {
        next(error);
    }
};
/**
 * Add a post ID to the authenticated user's profile posts list.
 * Called after creating a post.
 * Requires authentication via verifyToken middleware.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addPostToProfile = async (req, res, next) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id; // Authenticated user

        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        if (!profile.posts.includes(postId)) {
            profile.posts = [...profile.posts, postId];
            await profile.save();
        }

        res.status(200).json({ success: true, message: "Post added to profile successfully" });
    } catch (error) {
        next(error);
    }
};

/**
 * Add a friend ID to the authenticated user's profile friends list.
 * Called after accepting a friendship.
 * Requires authentication via verifyToken middleware.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addFriendToProfile = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const userId = req.user.id; // Authenticated user

        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        if (!profile.friends.includes(friendId)) {
            profile.friends = [...profile.friends, friendId];
            await profile.save();
        }

        // Optionally, add to friend's profile as well (if exists)
        const friendProfile = await Profile.findOne({ where: { userId: friendId } });
        if (friendProfile && !friendProfile.friends.includes(userId)) {
            friendProfile.friends = [...friendProfile.friends, userId];
            await friendProfile.save();
        }

        res.status(200).json({ success: true, message: "Friend added to profile successfully" });
    } catch (error) {
        next(error);
    }
};