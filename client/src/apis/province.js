import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const getProvinces = (data) => {
  return axiosServices.get(`/${PATHS.PROVINCE}/${PATHS.LIST}`, data)
}
export const getProvinceDistrict = (data) => {
  return axiosServices.get(`/${PATHS.PROVINCE}/${PATHS.DISTRICT}/${data}`)
}
export const getDistrictWards = (data) => {
  return axiosServices.get(`/${PATHS.DISTRICT}/${PATHS.WARD}/${data}`)
}
