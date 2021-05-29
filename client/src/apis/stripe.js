import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createPaymentIntents = (data) => {
  return axiosServices.post(`/${PATHS.PAYMENT}/create-payment-intent`, data)
}
