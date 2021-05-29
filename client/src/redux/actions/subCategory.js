import * as types from '../constants/subCategory'
// createOrUpdateUser
export const createSubCategory = (data) => {
  return {
    type: types.CREATE_SUB_CATEGORY,
    payload: data,
  }
}
export const createSubCategorySuccess = (data) => {
  return {
    type: types.CREATE_SUB_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const createSubCategoryFailed = (error) => {
  return {
    type: types.CREATE_SUB_CATEGORY_FAILED,
    payload: { error },
  }
}

// get sub categories
export const getSubCategories = (data) => {
  return {
    type: types.GET_SUB_CATEGORIES,
    payload: data,
  }
}
export const getSubCategoriesSuccess = (data) => {
  return {
    type: types.GET_SUB_CATEGORIES_SUCCESS,
    payload: { data },
  }
}
export const getSubCategoriesFailed = (error) => {
  return {
    type: types.GET_SUB_CATEGORIES_FAILED,
    payload: { error },
  }
}
// get Sub category
export const getSubCategory = (data) => {
  return {
    type: types.GET_SUB_CATEGORY,
    payload: data,
  }
}
export const getSubCategorySuccess = (data) => {
  return {
    type: types.GET_SUB_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const getSubCategoryFailed = (error) => {
  return {
    type: types.GET_SUB_CATEGORY_FAILED,
    payload: { error },
  }
}
// delete Sub category
export const deleteSubCategories = (data) => {
  return {
    type: types.DELETE_SUB_CATEGORY,
    payload: data,
  }
}
export const deleteSubCategoriesSuccess = (data) => {
  return {
    type: types.DELETE_SUB_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const deleteSubCategoriesFailed = (error) => {
  return {
    type: types.DELETE_SUB_CATEGORY_FAILED,
    payload: { error },
  }
}

// update Sub category
export const updateSubCategories = (data) => {
  return {
    type: types.UPDATE_SUB_CATEGORY,
    payload: data,
  }
}
export const updateSubCategoriesSuccess = (data) => {
  return {
    type: types.UPDATE_SUB_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const updateSubCategoriesFailed = (error) => {
  return {
    type: types.UPDATE_SUB_CATEGORY_FAILED,
    payload: { error },
  }
}
