const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    post: {
        type: String,
        required: true,
    },

    time: {
        type: Date,
        default: Date.now
    }
    
})

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;