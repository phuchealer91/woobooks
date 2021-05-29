import { EditData } from '../../helpers/shortFunctions'
import * as types from '../constants/post'
const initValue = {
  posts: [],
  loading: false,
  result: null,
  page: 2,
}
const postReducer = (state = initValue, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] }
    case types.LOADING_POST:
      return { ...state, loading: action.payload }
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      }
    case types.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      }
    default:
      return state
  }
}

export default postReducer
