import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createSubCategories = (data) => {
  return axiosServices.post(`/${PATHS.SUB_CATEGORY}`, data)
}
export const updateSubCategories = (slug, data) => {
  return axiosServices.put(`/${PATHS.SUB_CATEGORY}/${slug}`, data)
}
export const deleteSubCategories = (slug) => {
  return axiosServices.delete(`/${PATHS.SUB_CATEGORY}/${slug}`)
}
export const getSubCategories = (data) => {
  return axiosServices.get(`/${PATHS.SUB_CATEGORY}/${PATHS.LIST}`, data)
}
export const getSubCategory = (slug, data) => {
  return axiosServices.get(`/${PATHS.SUB_CATEGORY}/${slug}`, data)
}
