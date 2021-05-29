import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createProducts = (data) => {
  return axiosServices.post(`/${PATHS.PRODUCT}`, data)
}
export const updateProducts = (slug, data) => {
  return axiosServices.put(`/${PATHS.PRODUCT}/${slug}`, data)
}
export const deleteProducts = (slug) => {
  return axiosServices.delete(`/${PATHS.PRODUCT}/${slug}`)
}
export const getListProductss = (sort, order, page) => {
  return axiosServices.post(`/${PATHS.PRODUCT}/${PATHS.LIST}`, {
    sort,
    order,
    page,
  })
}
export const getListProductSales = (page) => {
  return axiosServices.post(`/${PATHS.PRODUCT}/${PATHS.LIST}-${PATHS.SALE}`, {
    page,
  })
}
// export const getListProductss = (sort, order, page) => {
//   return axiosServices.post(
//     `/${PATHS.PRODUCT}/${PATHS.LIST}`,
//     sort,
//     order,
//     page
//   )
// }
export const getProduct = (slug, data) => {
  return axiosServices.get(`/${PATHS.PRODUCT}/${slug}`, data)
}
export const getRelated = (productId, data) => {
  return axiosServices.get(
    `/${PATHS.PRODUCT}/${PATHS.RELATED}/${productId}`,
    data
  )
}
export const getProductsCounts = (data) => {
  return axiosServices.get(
    `/${PATHS.PRODUCT}/${PATHS.LIST}/${PATHS.TOTAL}`,
    data
  )
}
export const getListAllProducts = (count, data) => {
  return axiosServices.get(`/${PATHS.PRODUCT}/${PATHS.LIST}/${count}`, data)
}
export const productRatings = (productId, data) => {
  return axiosServices.put(
    `/${PATHS.PRODUCT}/${PATHS.REVIEW}/${productId}`,
    data
  )
}
export const fetchProductsSearch = (data) => {
  return axiosServices.post(
    `/${PATHS.PRODUCT}/${PATHS.SEARCH}/${PATHS.FILTERS}`,
    data
  )
}
