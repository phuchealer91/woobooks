// const cloudinary = require('../config/configCloudinary')
const cloudinary = require('cloudinary')
// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports.uploadImage = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    })
    return res
      .status(200)
      .json({ public_id: result.public_id, url: result.secure_url })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.deleteImage = async (req, res) => {
  try {
    let image_id = req.body.public_id
    cloudinary.uploader.destroy(image_id, (err, result) => {
      if (err) return res.json({ msg: 'Delete image failed !' })
      res.send('Delete image success !')
    })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
