const mongoose = require('mongoose')
const schema = mongoose.Schema

const provinceSchema = new schema(
  {
    code: { type: String },
    name: { type: String },
    unit: { type: String },
  },

  { timestamps: true }
)

const Province = mongoose.model('Province', provinceSchema)
module.exports = Province
