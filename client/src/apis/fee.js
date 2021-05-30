import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createFees = (data) => {
  return axiosServices.post(`/${PATHS.FEE}/`, data)
}
export const getFees = (data) => {
  return axiosServices.get(`/${PATHS.FEE}/${PATHS.LIST}`, data)
}
export const deleteFees = (feeId, data) => {
  return axiosServices.delete(`/${PATHS.FEE}/${feeId}`, data)
}
