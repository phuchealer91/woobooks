import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createCategories = (data) => {
  return axiosServices.post(`/${PATHS.CATEGORY}`, data)
}
export const updateCategories = (slug, data) => {
  return axiosServices.put(`/${PATHS.CATEGORY}/${slug}`, data)
}
export const deleteCategories = (slug) => {
  return axiosServices.delete(`/${PATHS.CATEGORY}/${slug}`)
}
export const getCategories = (data) => {
  return axiosServices.get(`/${PATHS.CATEGORY}/${PATHS.LIST}`, data)
}
export const getCategory = (slug, data) => {
  return axiosServices.get(`/${PATHS.CATEGORY}/${slug}`, data)
}
export const getCategorySubs = (_id, data) => {
  return axiosServices.get(`/${PATHS.CATEGORY}/${PATHS.SUBS}/${_id}`, data)
}
