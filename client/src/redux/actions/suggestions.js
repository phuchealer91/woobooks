import axiosServices from '../../apis/axiosServices'
import PATHS from '../constants/paths'

export const SUGGES_TYPES = {
  LOADING: 'LOADING_SUGGES',
  GET_USERS: 'GET_USERS_SUGGES',
}

export const getSuggestions = () => async (dispatch) => {
  try {
    dispatch({ type: SUGGES_TYPES.LOADING, payload: true })

    const res = await axiosServices.get(`${PATHS.USER}/suggestions/list`)
    console.log('hello ', res)
    dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data })

    dispatch({ type: SUGGES_TYPES.LOADING, payload: false })
  } catch (err) {
    console.log('error', err)
  }
}
