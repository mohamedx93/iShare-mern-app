import mongoose from 'mongoose'
import PostMessage from '../models/postMessageModel.js'


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        // console.log('get request received');
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const createPost = async (req, res) => {
    // console.log('create request')
    const post = req.body;
    post.tags = post.tags.map(tag => tag.trim());
    const newPost = new PostMessage({
        ...post,
        creatorId: req.userId,
        createdDate: new Date().toISOString(),
    });
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
    
}

export const updatePost = async (req, res) => {
    // console.log('update request received');
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    post.tags = post.tags.map(tag => tag.trim())

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}



export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.json({ message: 'Unauthenticated' });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const likedPost = await PostMessage.findById(id);
    const likeIndx = likedPost.likes.findIndex((id) => id === String(req.userId));
    if (likeIndx === -1) {
        likedPost.likes.push(req.userId);
    }
    else {
        likedPost.likes = likedPost.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, likedPost, { new: true });
    res.json(updatedPost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}