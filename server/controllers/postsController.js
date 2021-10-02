import mongoose from 'mongoose'
import PostMessage from '../models/postMessageModel.js'

export const getPost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await PostMessage.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPosts = async (req, res) => {
  
  const { page } = req.query
  try {
    const LIMIT = 8
    const startIndx = (Number(page) - 1) * 8 // get the starting index of the wanted page
    const total = await PostMessage.countDocuments({})
    const posts = await PostMessage.find()
      .sort({ createDate: -1 })
      .limit(LIMIT).skip(startIndx)

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, searchTags } = req.query
  try {
    const title = new RegExp(searchQuery, 'i')
    const foundPosts = await PostMessage
      .find({ $or: [{ title }, { tags: { $in: searchTags.split(',') } }] })
    res.status(200).json({
      data: foundPosts.sort((p1, p2) => p2.createDate - p1.createDate)
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  
  const post = req.body
  post.tags = post.tags.map(tag => tag.trim())
  const newPost = new PostMessage({
    ...post,
    creatorId: req.userId,
    createDate: new Date().toISOString()
  })

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  
  const { id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  post.tags = post.tags.map(tag => tag.trim())

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
  res.json(updatedPost)
}

export const likePost = async (req, res) => {
  const { id } = req.params
  if (!req.userId) return res.json({ message: 'Unauthenticated' })
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  const likedPost = await PostMessage.findById(id)
  const likeIndx = likedPost.likes.findIndex((id) => id === String(req.userId))
  if (likeIndx === -1) {
    likedPost.likes.push(req.userId)
  } else {
    likedPost.likes = likedPost.likes.filter((id) => id !== String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, likedPost, { new: true })
  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  await PostMessage.findByIdAndRemove(id)
  res.json({ message: 'Post deleted successfully' })
}
