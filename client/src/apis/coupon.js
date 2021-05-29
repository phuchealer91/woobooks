import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createCoupons = (data) => {
  return axiosServices.post(`/${PATHS.COUPON}/`, data)
}
export const getCoupons = (data) => {
  return axiosServices.get(`/${PATHS.COUPON}/${PATHS.LIST}`, data)
}
export const deleteCoupons = (couponId, data) => {
  return axiosServices.delete(`/${PATHS.COUPON}/${couponId}`, data)
}
