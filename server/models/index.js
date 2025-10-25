import User from './user.model.js';
import Friendship from './friend.model.js';

// Định nghĩa associations sau khi tất cả models được import
User.hasMany(Friendship, { foreignKey: 'userId', as: 'sentFriendships' });
User.hasMany(Friendship, { foreignKey: 'friendId', as: 'receivedFriendships' });

Friendship.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Friendship.belongsTo(User, { foreignKey: 'friendId', as: 'friend' });

// Xuất các models để sử dụng ở nơi khác (nếu cần)
export { User, Friendship };