import Friendship from "../models/friend.model.js";
import User from "../models/user.model.js"

export const sendFriendRequest = async (req, res) => {
    try{
        const { friendId } = req.body;
        const userId = req.user.id;

        const friend = await User.findByPk(friendId);
        if(!friend) {
            return res.status(404).json({ error: 'Unspecified user' });
        }

        const existing = await Friendship.findOne({
            where: { userId, friendId, status: 'accepted'}
        });
        if(existing) {
            return res.status(400).json({error: "Already friend"});
        }
        const friendship = await Friendship.create({
            userId,
            friendId,
            status: 'pending'
        });

        res.status(400).json({error: 'Request has been sent', friendship});
    } catch(error) {
        res.status(500).json({error: "Internal server error"});
    }
};

export const acceptFriendRequest = async (req, res) => {
    try{
        const { requestId } = req.params;
        const userId = req.user.id;

        const friendship = await Friendship.findByPk(requestId);
        if(!friendship) {
            return res.status(404).json({error: "Request is not exist"});
        }

        if(friendship.friendId !== userId ) {
            return res.status(403).json({error: "Cannot accept this request"});
        }

        await friendship.update({status: 'accepted'});

        await Friendship.create({
            userId: friendship.friendId,
            friendId: friendship.userId,
            status: 'accepted'
        })

        res.json({message: 'Accepted request'});
    } catch(error) {
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try{
        const { requestId } = req.params;
        const userId = req.user.id;

        const friendship = await Friendship.findByPk(requestId);
        if(!friendship) {
            return res.status(404).json({error : 'Request is not exist'});
        }

        if(friendship.friendId !== userId) {
            return res.status(404).json({error: 'Cannot reject'});
        }

        await friendship.destroy();
        res.json({message: 'Reject request'})
    } catch(error) {
        res.status(505).json({error: 'Internal server error' + error.message });
    }
};

export const getFriends = async (req, res) => {
    try {
        const userId = req.user.id;

        const friends = await Friendship.findAll({
            where: { userId, status: 'accepted' },
            include: [{
                model: User,
                as: 'friend',  // Giả sử bạn đã định nghĩa association trong model
                attributes: ['id', 'username', 'email']
            }]
        });

        res.json({ friends: friends.map(f => f.friend) });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};

export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user.id;

        const requests = await Friendship.findAll({
            where: { friendId: userId, status: 'pending' },
            include: [{
                model: User,
                as: 'user',  // Association cho userId
                attributes: ['id', 'username', 'email']
            }]
        });

        res.json({ requests: requests.map(r => ({ ...r.toJSON(), sender: r.user })) });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};