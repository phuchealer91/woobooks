import * as types from '../constants/stripe'
let initialState = {
  clientSecret: '',
  cartTotal: 0,
  totalAfterDiscount: 0,
  payable: 0,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PAYMENT_ITENT:
      return { ...state }

    case types.CREATE_PAYMENT_ITENT_SUCCESS:
      const {
        clientSecret,
        cartTotal,
        totalAfterDiscount,
        payable,
      } = action.payload.data
      return {
        ...state,
        clientSecret,
        cartTotal,
        totalAfterDiscount,
        payable,
      }

    default:
      return state
  }
}

export default cartReducer
