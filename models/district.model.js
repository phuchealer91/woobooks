const mongoose = require('mongoose')
const schema = mongoose.Schema

const districtSchema = new schema(
  {
    code: { type: String },
    name: { type: String },
    unit: { type: String },
    province_code: { type: String },
    province_name: { type: String },
    full_name: { type: String },
  },

  { timestamps: true }
)

const District = mongoose.model('District', districtSchema)
module.exports = District
