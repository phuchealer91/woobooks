import * as types from '../constants/order'
// DELETE COUPON
export const getOrder = (data) => {
  return {
    type: types.GET_ORDER,
    payload: data,
  }
}
export const getOrderSuccess = (data) => {
  return {
    type: types.GET_ORDER_SUCCESS,
    payload: { data },
  }
}
export const getOrderFailed = (error) => {
  return {
    type: types.GET_ORDER_FAILED,
    payload: { error },
  }
}
export const updateOrderStatus = (data) => {
  return {
    type: types.UPDATE_ORDER_STATUS,
    payload: data,
  }
}
export const updateOrderStatusSuccess = (data) => {
  return {
    type: types.UPDATE_ORDER_STATUS_SUCCESS,
    payload: { data },
  }
}
export const updateOrderStatusFailed = (error) => {
  return {
    type: types.UPDATE_ORDER_STATUS_FAILED,
    payload: { error },
  }
}
