import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createSuppliers = (data) => {
  return axiosServices.post(`/${PATHS.SUPPLIER}`, data)
}
export const updateSuppliers = (slug, data) => {
  return axiosServices.put(`/${PATHS.SUPPLIER}/${slug}`, data)
}
export const deleteSuppliers = (slug) => {
  return axiosServices.delete(`/${PATHS.SUPPLIER}/${slug}`)
}
export const getSuppliers = (data) => {
  return axiosServices.get(`/${PATHS.SUPPLIER}/${PATHS.LIST}`, data)
}
export const getSupplier = (slug, data) => {
  return axiosServices.get(`/${PATHS.SUPPLIER}/${slug}`, data)
}
export const getSuppliersss = (data) => {
  return axiosServices.post(`/${PATHS.SUPPLIER}/slug`, data)
}
