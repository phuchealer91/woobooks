import * as types from '../constants/search'
let initialState = {
  text: '',
  productsAfterFilter: [],
}
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_QUERY:
      return { ...state, ...action.payload }
    case types.SEARCH_QUERY_SUCCESS:
      return { ...state }
    case types.PRODUCT_SEARCH_SUCCESS:
      return { ...state, productsAfterFilter: action.payload.data.products }
    default:
      return state
  }
}

export default searchReducer
