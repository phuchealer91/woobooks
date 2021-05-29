import * as types from '../constants/message'

const peerReducer = (state = null, action) => {
  switch (action.type) {
    case types.PEER:
      return action.payload

    default:
      return state
  }
}

export default peerReducer
