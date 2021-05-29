import * as types from '../constants/post'

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case types.STATUS_POST:
      return action.payload

    default:
      return state
  }
}

export default statusReducer
