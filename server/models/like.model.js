import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'likes',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['userId', 'postId']
        },
        {
            fields: ['postId']
        }
    ]
}
);

Like.belongsTo(User, { foreignKey: 'userId' });

export default Like;