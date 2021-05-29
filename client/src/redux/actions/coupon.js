import * as types from '../constants/coupon'

// ADD COUPON
export const createCoupon = (data) => {
  return {
    type: types.ADD_COUPON,
    payload: data,
  }
}
export const createCouponSuccess = (data) => {
  return {
    type: types.ADD_COUPON_SUCCESS,
    payload: { data },
  }
}
export const createCouponFailed = (error) => {
  return {
    type: types.ADD_COUPON_FAILED,
    payload: { error },
  }
}
// GET COUPON
export const getCoupon = (data) => {
  return {
    type: types.GET_COUPON,
    payload: data,
  }
}
export const getCouponSuccess = (data) => {
  return {
    type: types.GET_COUPON_SUCCESS,
    payload: { data },
  }
}
export const getCouponFailed = (error) => {
  return {
    type: types.GET_COUPON_FAILED,
    payload: { error },
  }
}
// DELETE COUPON
export const deleteCoupon = (data) => {
  return {
    type: types.DELETE_COUPON,
    payload: data,
  }
}
export const deleteCouponSuccess = (data) => {
  return {
    type: types.DELETE_COUPON_SUCCESS,
    payload: { data },
  }
}
export const deleteCouponFailed = (error) => {
  return {
    type: types.DELETE_COUPON_FAILED,
    payload: { error },
  }
}
// DELETE COUPON
export const appliedCoupon = (data) => {
  return {
    type: types.APPLIED_COUPON,
    payload: data,
  }
}
export const appliedCouponSuccess = (data) => {
  return {
    type: types.APPLIED_COUPON_SUCCESS,
    payload: { data },
  }
}
export const appliedCouponFailed = (error) => {
  return {
    type: types.APPLIED_COUPON_FAILED,
    payload: { error },
  }
}
