const Post = require('../models/post-models');

const createPost = async (req, res) => {
    try {
        const { userid, username, post } = req.body;
        Post.create({ userid, username, post });
        res.status(201).json({
            msg: "Post created successfully"
        })

        // Post.find({}).sort({ "time": -1 }) //userid:['d','dd']
        //     .then(users => res.json(users))
        //     .catch(err => res.status(500).json({ message: err.message }));

    } catch (error) {
        console.log("Error while creating post")
    }
}

const fetchPost = async (req, res) => {
    try {
        Post.find({}).sort({ "time": -1 }) //userid:['d','dd']
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ message: err.message }));

    } catch (error) {
        console.log("Error while fetching posts", error)
    }
}


const updatePost = async (req, res) => {
    try {
        const postid = req.params.id;
        const updateData = {
            post: req.body.post,
        }
        Post.findByIdAndUpdate(postid, updateData, { new: true })
            .then(updatedPost => {
                if (!updatedPost) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(updatedPost);
            })
            .catch(err => res.status(400).json({ message: err.message }));


    } catch (error) {
        console.log("Error while Updating the post", error)
    }
}

const deletePost = async (req, res) => {
    const postid = req.params.id;
    Post.findByIdAndDelete(postid)
        .then(deletedPost => {
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        })
        .catch(err => res.status(400).json({ message: err.message }));
}



module.exports = { createPost, fetchPost, updatePost, deletePost };