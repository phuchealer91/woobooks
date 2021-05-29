import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const getTotalOrderss = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/${PATHS.LIST}/total`, data)
}
export const getOrders = (data) => {
  return axiosServices.post(`/${PATHS.ORDER}/${PATHS.LIST}`, data)
}
export const updatedOrderStatus = (orderId, orderStatus) => {
  return axiosServices.put(`/${PATHS.ORDER}/order-status`, {
    orderId,
    orderStatus,
  })
}
export const updatedOrderCancelStatus = (orderId, orderStatus) => {
  return axiosServices.put(`/${PATHS.ORDER}/order-cancel-status`, {
    orderId,
    orderStatus,
  })
}
export const removeOrders = (orderId) => {
  return axiosServices.post(`/${PATHS.ORDER}/remove-order`, orderId)
}
export const StatisticalOrders = (data) => {
  return axiosServices.post(`/${PATHS.ORDER}/order-by-date`, data)
}
export const StatisticalOrderFilters = (data) => {
  return axiosServices.post(`/${PATHS.ORDER}/order-filters`, data)
}
export const getOrdersCompleteds = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/order-completed`, data)
}
export const getTotalPriceDays = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/order-price-today`, data)
}
export const getTotalPriceWeeks = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/order-price-week`, data)
}
export const getTotalPriceMonths = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/order-price-month`, data)
}
export const getTotalPriceYears = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/order-price-year`, data)
}
export const getTotalOrderStatusMonths = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/order-status-month`, data)
}
export const getTopSellers = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/top-sellers`, data)
}
export const getNewOrderss = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/new-orders`, data)
}
