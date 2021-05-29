import * as types from '../constants/notify'
export const notify = (data) => {
  return {
    type: types.NOTIFY,
    payload: data,
  }
}
