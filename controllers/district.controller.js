const Ward = require('../models/ward.model')

module.exports.getDistrictWard = async (req, res) => {
  const districtId = req.params.id
  try {
    const wards = await Ward.find({
      district_code: districtId,
    })
    if (!wards) return res.status(400).json({ error: 'District không tồn tại' })
    return res.status(200).json({ wards })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
