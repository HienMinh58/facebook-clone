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
}, {
    timestamps: true    
});

const Post = mongoose.model('Post', postSchema);

export default Post;