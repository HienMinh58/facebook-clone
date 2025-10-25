import express from 'express';
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriends, getPendingRequests } from '../controller/friend.controller.js';  // Đường dẫn tương ứng với controller
import { verifyToken } from '../middleware/authMiddleware.js';  // Import middleware từ file bạn cung cấp

const router = express.Router();

// Áp dụng middleware xác thực cho tất cả routes
router.use(verifyToken);

// Gửi yêu cầu kết bạn
router.post('/request', sendFriendRequest);

// Chấp nhận yêu cầu kết bạn
router.put('/:requestId/accept', acceptFriendRequest);

// Từ chối yêu cầu kết bạn
router.delete('/:requestId/reject', rejectFriendRequest);

// Lấy danh sách bạn bè
router.get('/', getFriends);

// Lấy danh sách yêu cầu đang chờ
router.get('/pending', getPendingRequests);

export default router;