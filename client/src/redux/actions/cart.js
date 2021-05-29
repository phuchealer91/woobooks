import * as types from '../constants/cart'
// get category
export const addToCart = (data) => {
  return {
    type: types.ADD_TO_CART,
    payload: data,
  }
}
export const addToCartSuccess = (data) => {
  return {
    type: types.ADD_TO_CART_SUCCESS,
    payload: { data },
  }
}
export const addToCartFailed = (error) => {
  return {
    type: types.ADD_TO_CART_FAILED,
    payload: { error },
  }
}
//  USER CART
export const userCart = (data) => {
  return {
    type: types.USER_CART,
    payload: data,
  }
}
export const userCartSuccess = (data) => {
  return {
    type: types.USER_CART_SUCCESS,
    payload: { data },
  }
}
export const userCartFailed = (error) => {
  return {
    type: types.USER_CART_FAILED,
    payload: { error },
  }
}
// GET USER CART
export const getUserCart = (data) => {
  return {
    type: types.GET_USER_CART,
    payload: data,
  }
}
export const getUserCartSuccess = (data) => {
  return {
    type: types.GET_USER_CART_SUCCESS,
    payload: { data },
  }
}
export const getUserCartFailed = (error) => {
  return {
    type: types.GET_USER_CART_FAILED,
    payload: { error },
  }
}
// EMPTY CART
export const emptyCart = (data) => {
  return {
    type: types.EMPTY_CART,
    payload: data,
  }
}
export const emptyCartSuccess = (data) => {
  return {
    type: types.EMPTY_CART_SUCCESS,
    payload: { data },
  }
}
export const emptyCartFailed = (error) => {
  return {
    type: types.EMPTY_CART_FAILED,
    payload: { error },
  }
}
// ADD ADDRESS CART
export const addAddressCart = (data) => {
  return {
    type: types.ADD_ADDRESS_CART,
    payload: data,
  }
}
export const addAddressCartSuccess = (data) => {
  return {
    type: types.ADD_ADDRESS_CART_SUCCESS,
    payload: { data },
  }
}
export const addAddressCartFailed = (error) => {
  return {
    type: types.ADD_ADDRESS_CART_FAILED,
    payload: { error },
  }
}
// ADD COUPON CART
export const applyCouponCart = (data) => {
  return {
    type: types.APPLY_COUPON_CART,
    payload: data,
  }
}
export const applyCouponCartSuccess = (data) => {
  return {
    type: types.APPLY_COUPON_CART_SUCCESS,
    payload: { data },
  }
}
export const applyCouponCartFailed = (error) => {
  return {
    type: types.APPLY_COUPON_CART_FAILED,
    payload: { error },
  }
}
// CREATE ORDER
export const createOrder = (data) => {
  return {
    type: types.CREATE_ORDER,
    payload: data,
  }
}
export const createOrderSuccess = (data) => {
  return {
    type: types.CREATE_ORDER_SUCCESS,
    payload: { data },
  }
}
export const createOrderFailed = (error) => {
  return {
    type: types.CREATE_ORDER_FAILED,
    payload: { error },
  }
}
// USER ORDER
export const userOrder = (data) => {
  return {
    type: types.USER_ORDER,
    payload: data,
  }
}
export const userOrderSuccess = (data) => {
  return {
    type: types.USER_ORDER_SUCCESS,
    payload: { data },
  }
}
export const userOrderFailed = (error) => {
  return {
    type: types.USER_ORDER_FAILED,
    payload: { error },
  }
}
