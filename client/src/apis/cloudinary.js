import axiosServices from './axiosServices'

export const uploadFileImages = (data) => {
  return axiosServices.post(`/v1/uploadImages`, data)
}
export const deleteUploadImage = (public_id) => {
  return axiosServices.post(`/v1/removeImage`, public_id)
}
