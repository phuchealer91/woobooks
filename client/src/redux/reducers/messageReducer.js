import { DeleteData } from '../../helpers/shortFunctions'
import * as types from '../constants/message'

const initValue = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
  firstLoad: false,
}

const messageReducer = (state = initValue, action) => {
  switch (action.type) {
    case types.ADD_USER:
      if (state.users.every((item) => item._id !== action.payload._id)) {
        return {
          ...state,
          users: [action.payload, ...state.users],
        }
      }
      return state

    case types.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.sender ||
          user._id === action.payload.recipient
            ? {
                ...user,
                text: action.payload.text,
                medias: action.payload.medias,
              }
            : user
        ),
      }
    case types.GET_CONVERSATIONS:
      return {
        ...state,
        users: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      }
    case types.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
        resultData: action.payload.result,
      }
    case types.DELETE_CONVERSATION:
      return {
        ...state,
        users: DeleteData(state.users, action.payload),
        data: DeleteData(state.data, action.payload),
      }

    default:
      return state
  }
}

export default messageReducer
