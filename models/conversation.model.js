const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const conversationSchemas = new schema(
  {
    recipients: [{ type: ObjectId, ref: 'User' }],
    text: String,
    medias: Array,
    call: Object,
  },
  { timestamps: true }
)

const Conversation = mongoose.model('Conversation', conversationSchemas)
module.exports = Conversation
