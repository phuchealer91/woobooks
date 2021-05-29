import * as types from '../constants/coupon'
import { toast } from 'react-toastify'
let initialState = {
  couponList: [],
  isCoupons: false,
}

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.APPLIED_COUPON:
      return { ...state, isCoupons: action.payload }
    case types.ADD_COUPON:
      return { ...state }
    case types.ADD_COUPON_SUCCESS:
      toast.success('Add coupon success')
      return {
        ...state,
        couponList: [action.payload.data.coupon, ...state.couponList],
      }
    case types.GET_COUPON_SUCCESS:
      return { ...state, couponList: action.payload.data.coupon }
    case types.DELETE_COUPON_SUCCESS:
      toast.success('Delete coupon success ')
      return {
        ...state,
        couponList: state.couponList.filter(
          (c) => c._id !== action.payload.data
        ),
      }
    default:
      return state
  }
}

export default couponReducer
