import * as types from '../constants/message'

const callReducer = (state = null, action) => {
  switch (action.type) {
    case types.CALL:
      return action.payload

    default:
      return state
  }
}

export default callReducer
