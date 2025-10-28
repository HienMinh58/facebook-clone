import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js"; // Import để thiết lập association

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, // Đảm bảo một profile cho mỗi user
        references: {
            model: 'users',
            key: 'id'
        }
    },
    pfp: {
        type: DataTypes.STRING, // URL của ảnh đại diện
        allowNull: true,
    },
    profile_name: {
        type: DataTypes.STRING,
        allowNull: false, // Khởi tạo từ username của User
    },
    posts: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Mảng ID của posts (String từ Mongoose)
        defaultValue: [],
    },
    friends: {
        type: DataTypes.ARRAY(DataTypes.UUID), // Mảng ID bạn bè (UUID từ Friendship accepted)
        defaultValue: [],
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'profiles',
    timestamps: false,
});

// Association: One-to-One với User
Profile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Profile, { foreignKey: 'userId' });

export default Profile;