import * as types from '../constants/receipt'
let initialState = {
  receiptLists: [],
  totalPayment: 0,
}

// if (typeof window !== 'undefined') {
//   if (localStorage.getItem('warehouse')) {
//     initialState.receiptLists = JSON.parse(localStorage.getItem('warehouse'))
//   } else {
//     initialState.receiptLists = []
//   }
// }
const receiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_RECEIPT:
      // let total = 0
      // state.receiptLists.forEach((item) => {
      //   total += item.inPrice * item.inQuatity
      // })
      return {
        ...state,
        receiptLists: action.payload.unique,
        // totalPayment: total,
      }

    default:
      return state
  }
}

export default receiptReducer
