import * as types from '../constants/ui'
const initialState = {
  isLoading: false,
  visible: false,
}

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return { ...state, isLoading: true }
    case types.HIDE_LOADING:
      return { ...state, isLoading: false }
    case types.SHOW_DRAWER:
      return { ...state, visible: true }
    case types.HIDE_DRAWER:
      return { ...state, visible: false }
    default:
      return state
  }
}

export default UiReducer
