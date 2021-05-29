import * as types from '../constants/category'
// createOrUpdateUser
export const createCategory = (data) => {
  return {
    type: types.CREATE_CATEGORY,
    payload: data,
  }
}
export const createCategorySuccess = (data) => {
  return {
    type: types.CREATE_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const createCategoryFailed = (error) => {
  return {
    type: types.CREATE_CATEGORY_FAILED,
    payload: { error },
  }
}

// get categories
export const getCategories = (data) => {
  return {
    type: types.GET_CATEGORIES,
    payload: data,
  }
}
export const getCategoriesSuccess = (data) => {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    payload: { data },
  }
}
export const getCategoriesFailed = (error) => {
  return {
    type: types.GET_CATEGORIES_FAILED,
    payload: { error },
  }
}
// get category
export const getCategory = (data) => {
  return {
    type: types.GET_CATEGORY,
    payload: data,
  }
}
export const getCategorySuccess = (data) => {
  return {
    type: types.GET_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const getCategoryFailed = (error) => {
  return {
    type: types.GET_CATEGORY_FAILED,
    payload: { error },
  }
}
// delete category
export const deleteCategories = (data) => {
  return {
    type: types.DELETE_CATEGORY,
    payload: data,
  }
}
export const deleteCategoriesSuccess = (data) => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const deleteCategoriesFailed = (error) => {
  return {
    type: types.DELETE_CATEGORY_FAILED,
    payload: { error },
  }
}

// update category
export const updateCategories = (data) => {
  return {
    type: types.UPDATE_CATEGORY,
    payload: data,
  }
}
export const updateCategoriesSuccess = (data) => {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    payload: { data },
  }
}
export const updateCategoriesFailed = (error) => {
  return {
    type: types.UPDATE_CATEGORY_FAILED,
    payload: { error },
  }
}

// update category
export const getCategorySubs = (data) => {
  return {
    type: types.GET_CATEGORY_SUBS,
    payload: data,
  }
}
export const getCategorySubsSuccess = (data) => {
  return {
    type: types.GET_CATEGORY_SUBS_SUCCESS,
    payload: { data },
  }
}
export const getCategorySubsFailed = (error) => {
  return {
    type: types.GET_CATEGORY_SUBS_FAILED,
    payload: { error },
  }
}
