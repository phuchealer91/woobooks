const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const messageSchemas = new schema(
  {
    conversation: [{ type: ObjectId, ref: 'Conversation' }],
    sender: { type: ObjectId, ref: 'User' },
    recipient: { type: ObjectId, ref: 'User' },
    text: String,
    medias: Array,
    call: Object,
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchemas)
module.exports = Message
