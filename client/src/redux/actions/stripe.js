import * as types from '../constants/stripe'

export const createPaymentIntent = (data) => {
  return {
    type: types.CREATE_PAYMENT_ITENT,
    payload: data,
  }
}
export const createPaymentIntentSuccess = (data) => {
  return {
    type: types.CREATE_PAYMENT_ITENT_SUCCESS,
    payload: { data },
  }
}
export const createPaymentIntentFailed = (error) => {
  return {
    type: types.CREATE_PAYMENT_ITENT_FAILED,
    payload: { error },
  }
}
