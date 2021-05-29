import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginInUser } from '../redux/actions/users'
const dispatch = useDispatch()
const history = useHistory()
async function useLoginUser(results, notify, path) {
  const { user } = results
  const idTokenUser = await user.getIdTokenResult()
  const data = { email: user.email, token: idTokenUser.token }
  dispatch(loginInUser(data))
  toast.success(notify)
  history.push(`${path}`)
}

export default useLoginUser
