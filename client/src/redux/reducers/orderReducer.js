import * as types from '../constants/order'
let initialState = {
  ordersList: [],
  ordersListChange: [],
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDER:
      return { ...state }
    case types.GET_ORDER_SUCCESS:
      return { ...state, ordersList: action.payload.data.orders }
    case types.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        ordersListChange: action.payload.data.updatedOrderStatus,
      }
    default:
      return state
  }
}

export default orderReducer
