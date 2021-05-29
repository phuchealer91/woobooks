import * as types from '../constants/product'
import { toast } from 'react-toastify'
const initialState = {
  listProducts: [],
  listAllProducts: [],
  // productEditing: null,
  productRelated: [],
  isLoading: true,
  totalProducts: 0,
  reviews: [],
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PRODUCT:
      return { ...state }
    case types.CREATE_PRODUCT_SUCCESS:
      toast.success('Tạo sản phẩm thành công !')
      return { ...state, listAllProducts: action.payload.data.product }
    case types.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        listAllProducts: action.payload.data.products,
        isLoading: false,
      }
    case types.GET_PRODUCT_COUNT_SUCCESS:
      return {
        ...state,
        totalProducts: action.payload.data.total,
      }
    case types.PRODUCT_RATING_SUCCESS:
      return { ...state, reviews: action.payload.data.reviews }
    // case types.CREATE_CATEGORY:
    // case types.DELETE_CATEGORY:
    //   return { ...state }
    // case types.CREATE_CATEGORY_SUCCESS:
    //   toast.success('Tạo thành công !')
    //   return {
    //     ...state,
    //     listCategories: [action.payload.data.category, ...state.listCategories],
    //   }
    // case types.GET_CATEGORIES_SUCCESS:
    //   return {
    //     ...state,
    //     listCategories: action.payload.data.categories,
    //   }
    // case types.GET_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     productEditing: action.payload.data.product,
    //   }
    case types.GET_RELATED_SUCCESS:
      return {
        ...state,
        productRelated: action.payload.data.products,
      }
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        listProducts: action.payload.data.products,
        isLoading: false,
      }
    case types.UPDATE_PRODUCT_SUCCESS:
      toast.success('Cập nhật thành công !')
      const { data } = action.payload
      const index = state.listAllProducts.findIndex(
        (data) => data.slug === state.productEditing.slug
      )
      if (index !== -1) {
        return {
          ...state,
          listAllProducts: [
            ...state.listAllProducts.slice(0, index),
            data.product,
            ...state.listAllProducts.slice(index + 1),
          ],
        }
      }
      return { ...state }
    case types.DELETE_PRODUCT_SUCCESS:
      toast.success('Xóa sản phẩm thành công !')
      return {
        ...state,
        listAllProducts: state.listAllProducts.filter(
          (item) => item.slug !== action.payload.data
        ),
      }
    // case types.GET_CATEGORY_FAILED:
    //   return { ...state, categoryEditing: null }
    case types.DELETE_PRODUCT_FAILED:
      toast.error('Xóa thất bại !')
      return { ...state }
    default:
      return state
  }
}

export default productReducer
