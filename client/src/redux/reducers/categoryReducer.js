import * as types from '../constants/category'
import { toast } from 'react-toastify'
const initialState = {
  listCategories: [],
  productOfCategory: [],
  categoryEditing: null,
  categorySubs: [],
  isLoading: false,
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CATEGORY:
    case types.GET_CATEGORY:
    case types.DELETE_CATEGORY:
      return { ...state, isLoading: true }
    case types.CREATE_CATEGORY_SUCCESS:
      toast.success('Tạo thành công !')
      return {
        ...state,
        listCategories: [action.payload.data.category, ...state.listCategories],
      }
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        listCategories: action.payload.data.categories,
      }
    case types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryEditing: action.payload.data.category,
        productOfCategory: action.payload.data.products,
        isLoading: false,
      }
    case types.GET_CATEGORY_SUBS_SUCCESS:
      return {
        ...state,
        categorySubs: action.payload.data.subs,
      }
    case types.UPDATE_CATEGORY_SUCCESS:
      toast.success('Cập nhật thành công !')
      const { data } = action.payload
      const index = state.listCategories.findIndex(
        (data) => data.slug === state.categoryEditing.slug
      )
      if (index !== -1) {
        return {
          ...state,
          listCategories: [
            ...state.listCategories.slice(0, index),
            data.category,
            ...state.listCategories.slice(index + 1),
          ],
        }
      }
      return { ...state }
    case types.DELETE_CATEGORY_SUCCESS:
      toast.success('Xóa danh mục thành công !')
      return {
        ...state,
        listCategories: state.listCategories.filter(
          (item) => item.slug !== action.payload.data
        ),
      }
    case types.GET_CATEGORY_FAILED:
      return { ...state, categoryEditing: null }
    case types.CREATE_CATEGORY_FAILED:
      toast.error('Tạo thất bại !')
      return { ...state, listCategories: [] }
    default:
      return state
  }
}

export default categoryReducer
