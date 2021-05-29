import * as types from '../constants/ui'
export const showLoading = () => {
  return {
    type: types.SHOW_LOADING,
  }
}
export const hideLoading = () => {
  return {
    type: types.HIDE_LOADING,
  }
}

export const showDrawer = () => {
  return {
    type: types.SHOW_DRAWER,
  }
}
export const hideDrawer = () => {
  return {
    type: types.HIDE_DRAWER,
  }
}
