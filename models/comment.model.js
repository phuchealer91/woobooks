const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const commentSchema = new schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: Object,
    },
    reply: ObjectId,
    likes: [{ type: ObjectId, ref: 'User' }],
    postBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
