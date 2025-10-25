import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        default: 0,
        required: false
    },
    userId : {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true    
});

const Post = mongoose.model('Post', postSchema);

export default Post;