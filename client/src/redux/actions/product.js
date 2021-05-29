import * as types from '../constants/product'

export const createProduct = (data) => {
  return {
    type: types.CREATE_PRODUCT,
    payload: data,
  }
}
export const createProductSuccess = (data) => {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const createProductFailed = (error) => {
  return {
    type: types.CREATE_PRODUCT_FAILED,
    payload: { error },
  }
}
// GET PRODUCT
export const getProduct = (data) => {
  return {
    type: types.GET_PRODUCT,
    payload: data,
  }
}
export const getProductSuccess = (data) => {
  return {
    type: types.GET_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const getProductFailed = (error) => {
  return {
    type: types.GET_PRODUCT_FAILED,
    payload: { error },
  }
}
// GET PRODUCTS
export const getListProducts = (sort, order, page) => {
  return {
    type: types.GET_PRODUCTS,
    payload: { sort, order, page },
  }
}
export const getListProductsSuccess = (data) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload: { data },
  }
}
export const getListProductsFailed = (error) => {
  return {
    type: types.GET_PRODUCTS_FAILED,
    payload: { error },
  }
}
// GET PRODUCTS COUNT
export const getProductsCount = (data) => {
  return {
    type: types.GET_PRODUCT_COUNT,
    payload: data,
  }
}
export const getProductsCountSuccess = (data) => {
  return {
    type: types.GET_PRODUCT_COUNT_SUCCESS,
    payload: { data },
  }
}
export const getProductsCountFailed = (error) => {
  return {
    type: types.GET_PRODUCT_COUNT_FAILED,
    payload: { error },
  }
}
// GET LIST ALL
export const getListAllProduct = (data) => {
  return {
    type: types.GET_ALL_PRODUCT,
    payload: data,
  }
}
export const getListAllProductSuccess = (data) => {
  return {
    type: types.GET_ALL_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const getListAllProductFailed = (error) => {
  return {
    type: types.GET_ALL_PRODUCT_FAILED,
    payload: { error },
  }
}
// GET RELATED
export const getRelated = (data) => {
  return {
    type: types.GET_RELATED,
    payload: data,
  }
}
export const getRelatedSuccess = (data) => {
  return {
    type: types.GET_RELATED_SUCCESS,
    payload: { data },
  }
}
export const getRelatedFailed = (error) => {
  return {
    type: types.GET_RELATED_FAILED,
    payload: { error },
  }
}
// UPDATE PRODUCT
export const updateProduct = (data) => {
  return {
    type: types.UPDATE_PRODUCT,
    payload: data,
  }
}
export const updateProductSuccess = (data) => {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const updateProductFailed = (error) => {
  return {
    type: types.UPDATE_PRODUCT_FAILED,
    payload: { error },
  }
}
// DELETE PRODUCT
export const deleteProduct = (data) => {
  return {
    type: types.DELETE_PRODUCT,
    payload: data,
  }
}
export const deleteProductSuccess = (data) => {
  return {
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const deleteProductFailed = (error) => {
  return {
    type: types.DELETE_PRODUCT_FAILED,
    payload: { error },
  }
}
// PRODUCT RATINGS
export const productRating = (data) => {
  return {
    type: types.PRODUCT_RATING,
    payload: data,
  }
}
export const productRatingSuccess = (data) => {
  return {
    type: types.PRODUCT_RATING_SUCCESS,
    payload: { data },
  }
}
export const productRatingFailed = (error) => {
  return {
    type: types.PRODUCT_RATING_FAILED,
    payload: { error },
  }
}
