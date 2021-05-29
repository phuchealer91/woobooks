import * as types from '../constants/subCategory'
import { toast } from 'react-toastify'
const initialState = {
  listSubCategories: [],
  productOfSubCategory: [],
  subCategoryEditing: null,
  isLoading: false,
}

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_SUB_CATEGORY:
    case types.GET_SUB_CATEGORY:
    case types.DELETE_SUB_CATEGORY:
      return { ...state, isLoading: true }
    case types.CREATE_SUB_CATEGORY_SUCCESS:
      toast.success('Tạo thành công !')
      return {
        ...state,
        listSubCategories: [
          action.payload.data.subCategory,
          ...state.listSubCategories,
        ],
      }
    case types.GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        listSubCategories: action.payload.data.subCategorys,
      }
    case types.GET_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        subCategoryEditing: action.payload.data.subCategory,
        productOfSubCategory: action.payload.data.products,
        isLoading: false,
      }
    case types.UPDATE_SUB_CATEGORY_SUCCESS:
      toast.success('Cập nhật thành công !')
      const { data } = action.payload
      const index = state.listSubCategories.findIndex(
        (data) => data.slug === state.subCategoryEditing.slug
      )
      if (index !== -1) {
        return {
          ...state,
          listSubCategories: [
            ...state.listSubCategories.slice(0, index),
            data.subCategory,
            ...state.listSubCategories.slice(index + 1),
          ],
        }
      }
      return { ...state }
    case types.DELETE_SUB_CATEGORY_SUCCESS:
      toast.success('Xóa danh mục thành công !')
      return {
        ...state,
        listSubCategories: state.listSubCategories.filter(
          (item) => item.slug !== action.payload.data
        ),
      }
    case types.GET_SUB_CATEGORY_FAILED:
      return { ...state, subCategoryEditing: null }
    case types.CREATE_SUB_CATEGORY_FAILED:
      toast.error('Tạo thất bại !')
      return { ...state, listSubCategories: [] }
    default:
      return state
  }
}

export default subCategoryReducer
