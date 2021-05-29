import * as types from '../constants/search'
//
export const searchQuery = (data) => {
  return {
    type: types.SEARCH_QUERY,
    payload: data,
  }
}
export const searchQuerySuccess = (data) => {
  return {
    type: types.SEARCH_QUERY_SUCCESS,
    payload: { data },
  }
}
export const searchQueryFailed = (error) => {
  return {
    type: types.SEARCH_QUERY_FAILED,
    payload: { error },
  }
}
// product search
export const productSearch = (data) => {
  return {
    type: types.PRODUCT_SEARCH,
    payload: data,
  }
}
export const productSearchSuccess = (data) => {
  return {
    type: types.PRODUCT_SEARCH_SUCCESS,
    payload: { data },
  }
}
export const productSearchFailed = (error) => {
  return {
    type: types.PRODUCT_SEARCH_FAILED,
    payload: { error },
  }
}
