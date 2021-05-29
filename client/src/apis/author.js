import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createAuthors = (data) => {
  return axiosServices.post(`/${PATHS.AUTHOR}`, data)
}
export const updateAuthors = (slug, data) => {
  return axiosServices.put(`/${PATHS.AUTHOR}/${slug}`, data)
}
export const deleteAuthors = (slug) => {
  return axiosServices.delete(`/${PATHS.AUTHOR}/${slug}`)
}
export const getAuthors = (data) => {
  return axiosServices.get(`/${PATHS.AUTHOR}/${PATHS.LIST}`, data)
}
export const getAuthor = (slug, data) => {
  return axiosServices.get(`/${PATHS.AUTHOR}/${slug}`, data)
}
