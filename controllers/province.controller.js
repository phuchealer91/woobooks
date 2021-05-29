const Province = require('../models/province.model')
const District = require('../models/district.model')

module.exports.getProvinces = async (req, res) => {
  try {
    const provinces = await Province.find().exec()
    if (!provinces)
      return res.status(400).json({ error: 'District không tồn tại' })
    return res.status(200).json({ provinces })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getProvinceDistrict = async (req, res) => {
  const provinceId = req.params.id
  try {
    const districts = await District.find({
      province_code: provinceId,
    })
    if (!districts)
      return res.status(400).json({ error: 'District không tồn tại' })
    return res.status(200).json({ districts })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
