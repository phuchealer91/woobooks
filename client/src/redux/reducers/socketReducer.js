import * as types from '../constants/global'
const initValue = []

const socketReducer = (state = initValue, action) => {
  switch (action.type) {
    case types.SOCKET:
      return action.payload

    default:
      return state
  }
}

export default socketReducer
