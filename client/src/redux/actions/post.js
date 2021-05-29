import axiosServices from '../../apis/axiosServices'
import { ImageUpload } from '../../helpers/ImageUpload'
import PATHS from '../constants/paths'
import * as types from '../constants/post'
import * as GlobalTypes from '../constants/notify'
export const getUsers = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${data}`)
}

export const createPosts = ({ content, images, user }) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } })
    if (images.length > 0) media = await ImageUpload(images)
    const res = await axiosServices.post(`${PATHS.POST}/`, {
      content,
      images: media,
    })
    dispatch({
      type: types.CREATE_POST,
      payload: { ...res.data.posts, postBy: user.userDatas },
    })
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  } catch (error) {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  }
}
export const updatePosts = ({ content, images, user, status }) => async (
  dispatch
) => {
  let media = []
  const imageNewUrl = images.filter((img) => !img.url)
  const imageOldUrl = images.filter((img) => img.url)
  if (
    status.conent === content &&
    imageNewUrl.length === 0 &&
    imageOldUrl.length === status.images.length
  )
    return
  try {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } })
    if (imageNewUrl.length > 0) media = await ImageUpload(imageNewUrl)
    const res = await axiosServices.patch(`${PATHS.POST}/${status._id}`, {
      content,
      images: [...imageOldUrl, ...media],
    })
    dispatch({
      type: types.UPDATE_POST,
      payload: res.data.posts,
    })
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  } catch (error) {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  }
}
export const getPostsx = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOADING_POST, payload: true })
    const res = await axiosServices.get(`${PATHS.POST}/`)
    dispatch({ type: types.GET_POSTS, payload: res.data })
    dispatch({ type: types.LOADING_POST, payload: false })
  } catch (error) {
    dispatch({ type: types.LOADING_POST, payload: false })
  }
}

export const likePosts = ({ post, user }) => async (dispatch) => {
  try {
    const posts = { ...post, likes: [...post.likes, user.userDatas] }
    dispatch({
      type: types.UPDATE_POST,
      payload: posts,
    })
    await axiosServices.patch(`${PATHS.POST}/${post._id}/${PATHS.LIKE}`, null)
  } catch (error) {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  }
}
export const unLikePosts = ({ post, user }) => async (dispatch) => {
  try {
    const posts = {
      ...post,
      likes: post.likes.filter((like) => like._id !== user.userDatas._id),
    }

    dispatch({
      type: types.UPDATE_POST,
      payload: posts,
    })
    await axiosServices.patch(`${PATHS.POST}/${post._id}/${PATHS.UNLIKE}`, null)
  } catch (error) {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  }
}
