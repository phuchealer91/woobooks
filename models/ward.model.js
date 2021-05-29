const mongoose = require('mongoose')
const schema = mongoose.Schema

const wardSchema = new schema(
  {
    code: { type: String },
    name: { type: String },
    unit: { type: String },
    province_code: { type: String },
    district_code: { type: String },
    district_name: { type: String },
    province_name: { type: String },
    full_name: { type: String },
  },

  { timestamps: true }
)

const Ward = mongoose.model('Ward', wardSchema)
module.exports = Ward
