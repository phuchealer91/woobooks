import axiosServices from '../../apis/axiosServices'
import { auth } from '../../firebase'
import { ImageUpload } from '../../helpers/ImageUpload'
import { DeleteData } from '../../helpers/shortFunctions'
import PATHS from '../constants/paths'
import * as types from '../constants/users'
import { loginInUser } from './users'
export const getUsers = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${data}`)
}

export const getProfileUsers = ({ users, id }) => async (dispatch) => {
  if (users.every((user) => user._id !== id)) {
    try {
      dispatch({
        type: types.LOADING,
        payload: true,
      })
      const res = await axiosServices.get(`${PATHS.USER}/${id}`)
      dispatch({
        type: types.GET_USER,
        payload: res.data,
      })

      dispatch({
        type: types.LOADING,
        payload: false,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const updateProfileUser = ({ userData, avatar, user }) => async (
  dispatch
) => {
  try {
    dispatch({
      type: types.LOADING,
      payload: true,
    })
    let userx = await auth.currentUser

    let media
    if (avatar) media = await ImageUpload([avatar])
    userx.updateProfile({
      displayName: userData ? userData.name : user.userDatas.name,
      photoURL: avatar ? media[0].url : user.userDatas.photoURL,
    })
    await axiosServices.patch(`${PATHS.USER}/`, {
      ...userData,
      avatar: avatar ? media[0].url : user.userDatas.photoURL,
    })
    const value = {
      ...user,
      userDatas: {
        ...user.userDatas,
        ...userData,
        photoURL: avatar ? media[0].url : user.userDatas.photoURL,
      },
    }
    dispatch(loginInUser(value))
    dispatch({
      type: types.LOADING,
      payload: false,
    })
  } catch (error) {
    console.log('error', error)
  }
}

export const followUsers = ({ users, userx, user }) => async (dispatch) => {
  let newUsers
  if (users.every((item) => item._id !== userx._id)) {
    newUsers = { ...userx, followers: [...userx.followers, user.userDatas] }
  } else {
    users.forEach((item) => {
      if (item._id === userx._id) {
        newUsers = {
          ...item,
          followers: [...item.followers, user.userDatas],
        }
      }
    })
  }
  dispatch({
    type: types.FOLLOW,
    payload: newUsers,
  })
  const value = {
    ...user,
    userDatas: {
      ...user.userDatas,

      following: [...user.userDatas.following, newUsers],
    },
  }
  dispatch(loginInUser(value))
  try {
    await axiosServices.patch(
      `${PATHS.USER}/${userx._id}/${PATHS.FOLLOW}`,
      null
    )
  } catch (error) {
    console.log('error', error)
  }
}

export const unFollowUsers = ({ users, userx, user }) => async (dispatch) => {
  let newUsers
  if (users.every((item) => item._id !== userx._id)) {
    newUsers = {
      ...userx,
      followers: DeleteData(userx.followers, user.userDatas._id),
    }
  } else {
    users.forEach((item) => {
      if (item._id === userx._id) {
        newUsers = {
          ...item,
          followers: DeleteData(item.followers, user.userDatas._id),
        }
      }
    })
  }

  dispatch({
    type: types.UNFOLLOW,
    payload: newUsers,
  })
  const value = {
    ...user,
    userDatas: {
      ...user.userDatas,
      following: DeleteData(user.userDatas.following, newUsers._id),
    },
  }
  dispatch(loginInUser(value))
  try {
    await axiosServices.patch(
      `${PATHS.USER}/${userx._id}/${PATHS.UNFOLLOW}`,
      null
    )
  } catch (error) {
    console.log('error', error)
  }
}
