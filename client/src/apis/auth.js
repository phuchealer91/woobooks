import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'
export const registerOrUpdateUsers = (data) => {
  return axiosServices.post(`/${PATHS.AUTH}/create-or-update-user`, data)
}
export const currentUsers = (data) => {
  return axiosServices.get(`/${PATHS.AUTH}/current-user`, data)
}
// export const currentUsers = async (authtoken) => {
//   return await axios.post(
//     'http://localhost:8000/api/auth/current-user',
//     {},
//     { headers: { authorization: authtoken } }
//   )
// }
export const currentAdmins = (data) => {
  return axiosServices.post(`/${PATHS.AUTH}/current-admin`, data)
}
export const getNotifications = (data) => {
  return axiosServices.get(`/${PATHS.AUTH}/get-notifications`, data)
}
export const notificationUpdate = (data) => {
  return axiosServices.get(`/${PATHS.AUTH}/notification-update-order`, data)
}
// export const registerOrUpdateUsers = async (authorization) => {
//   return await axios.post(
//     'http://localhost:8000/api/auth/create-or-update-user ',
//     {},
//     {
//       headers: {
//         authorization,
//       },
//     }
//   )
// }
