import { UploadOutlined } from '@ant-design/icons'
import { Avatar, Badge, Input } from 'antd'
import React from 'react'
import Resizer from 'react-image-file-resizer'
import { deleteUploadImage, uploadFileImages } from '../../apis/cloudinary'
import './FileUpload.scss'

FileUpload.propTypes = {}

function FileUpload({ product, setProduct, setIsLoading }) {
  // const { user, product: pro } = useSelector((state) => ({ ...state }))
  function handleUploadAndResize(e) {
    let files = e.target.files
    let allImages = product.images
    if (files) {
      setIsLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            try {
              uploadFileImages({ image: uri }).then((res) => {
                setIsLoading(false)
                allImages.push(res.data)
                setProduct({ ...product, images: allImages })
              })
            } catch (error) {
              setIsLoading(false)
            }
          },
          'base64'
        )
      }
    }
  }
  function handleImageRemove(public_id) {
    setIsLoading(true)
    deleteUploadImage({ public_id })
      .then((res) => {
        setIsLoading(false)
        const { images } = product
        let newImages = images.filter((item) => {
          return item.public_id !== public_id
        })
        setProduct({ ...product, images: newImages })
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }
  return (
    <div className="upload">
      <div className="upload__preview">
        {product &&
          product.images.map((image) => {
            return (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: 'pointer' }}
              >
                <Avatar
                  key={image.public_id}
                  src={image.url}
                  size={100}
                  shape="square"
                  className="ml-3"
                />
              </Badge>
            )
          })}
      </div>

      <label className="border-gray-50 p-3 rounded-xl flex items-center cursor-pointer">
        <UploadOutlined />
        <span className="ml-1 text-green-600"> Click to Upload </span>
        <Input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={handleUploadAndResize}
        />
      </label>
    </div>
  )
}

export default FileUpload
