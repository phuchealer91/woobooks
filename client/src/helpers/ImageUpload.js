export const ImageUpload = async (images) => {
  let arrImages = []
  for (const item of images) {
    const formData = new FormData()
    if (item.camera) {
      formData.append('file', item.camera)
    } else {
      formData.append('file', item)
    }
    formData.append('upload_preset', 'wppoal56')
    formData.append('cloud_name', 'ecommerce-mp')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/ecommerce-mp/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
    const data = await res.json()
    arrImages.push({ public_id: data.public_id, url: data.secure_url })
  }
  return arrImages
}
