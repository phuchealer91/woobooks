const mongoose = require('mongoose')
const schema = mongoose.Schema

const logSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: 'User',
    },
    rootId: {
      type: schema.Types.ObjectId,
    },
    type: String,
  },

  { timestamps: true }
)

const Log = mongoose.model('Log', logSchema)
module.exports = Log
