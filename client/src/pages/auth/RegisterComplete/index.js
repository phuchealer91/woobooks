import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerOrUpdateUsers } from '../../../apis/auth'
import { auth } from '../../../firebase'
import { notify } from '../../../redux/actions/notify'
import { loginInUser } from '../../../redux/actions/users'
import { EMAIL_FOR_REGISTER } from '../../../redux/constants/keys'
import FormRegisterComplete from './FormRegisterComplete'
import './RegisterComplete.scss'

const RegisterComplete = (props) => {
  const [form] = Form.useForm()
  const [email, setEmail] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    setEmail(window.localStorage.getItem(EMAIL_FOR_REGISTER))
  }, [])
  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state
    if (intended) {
      history.push(intended.from)
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard')
      } else {
        history.push('/')
      }
    }
  }
  const onFinish = async ({ name, password }) => {
    if (!email) {
      toast.error('Email không được để trống')
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)
      // remove email localStorage
      if (result.user.emailVerified) {
        window.localStorage.removeItem(EMAIL_FOR_REGISTER)
      }
      // get id user
      let user = auth.currentUser
      // await user.updateProfile({ displayName: name })
      await user.updatePassword(password)
      const idTokenUser = await user.getIdTokenResult()
      // const { token } = idTokenUser
      // save email & token with redux store
      registerOrUpdateUsers(idTokenUser.token).then((res) => {
        if (res.data) {
          const data = {
            name: res.data.name,
            email: res.data.email,
            photoURL: res.data.photoURL,
            token: idTokenUser.token,
            userDatas: res.data,
            notificationsCount: res.data.notifications.newNotifications,
            role: res.data.role,
            _id: res.data._id,
          }
          dispatch(loginInUser(data))
          dispatch(notify(false))
        }
        toast.success('Đăng nhập thành công !')
        roleBasedRedirect(res)
      })
      // history.push(`${PATHS.HOME}`)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Hoàn thành đăng ký
        </div>

        <div className="mt-6">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <FormRegisterComplete email={email} />
            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Đăng ký ngay</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

RegisterComplete.propTypes = {}

export default RegisterComplete
