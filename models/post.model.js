const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const postSchema = new schema(
  {
    content: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{ type: ObjectId, ref: 'Comment' }],
    postBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post
