const Post = require('../models/post.model')
const User = require('../models/user.model')

module.exports.createPost = async (req, res) => {
  const { content, images } = req.body

  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const newPost = await new Post({
      content,
      images,
      postBy: user._id,
    }).save()
    return res.status(201).json({ posts: newPost })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.updatePost = async (req, res) => {
  const { content, images } = req.body

  try {
    const newPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        content,
        images,
      },
      { new: true }
    )
      .populate('postBy likes', 'name photoURL role')
      .sort('-createdAt')
      .exec()
    return res.status(200).json({ posts: { ...newPost._doc, content, images } })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getPosts = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email,
    }).exec()
    const admins = await User.find({ role: 'admin' }).select('_id').exec()
    const posts = await Post.find({
      $or: [
        { postBy: [...user.following, user._id] },
        { postBy: { $eq: admins[0]._id } },
      ],
    })
      .populate('postBy likes', 'name photoURL role')
      .populate({
        path: 'comments',
        populate: {
          path: 'postBy likes',
        },
      })
      .sort([['createdAt', 'desc']])
      .exec()
    return res.status(200).json({ posts, result: posts.length })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.likePost = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const post = await Post.find({ _id: req.params.id, likes: user._id })
    if (post.length > 0)
      return res.status(400).json({ msg: 'Bạn đã thích bài viết này rồi !' })
    const posts = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: user._id } },
      { new: true }
    ).exec()
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.unLikePost = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const posts = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: user._id } },
      { new: true }
    ).exec()
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
