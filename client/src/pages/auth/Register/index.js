import { GoogleOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerOrUpdateUsers } from '../../../apis/auth'
import { auth, googleAuthProvider } from '../../../firebase'
import { notify } from '../../../redux/actions/notify'
import { loginInUser } from '../../../redux/actions/users'
import { EMAIL_FOR_REGISTER } from '../../../redux/constants/keys'
import PATHS from '../../../redux/constants/paths'
import FormRegister from './FormRegister'
import './Register.scss'
const Register = (props) => {
  // useAuthUser()
  const [form] = Form.useForm()
  const { user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (user && user.token) history.push('/')
  }, [user, history])
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
  const onFinish = async ({ email }) => {
    // Config dùng trong TH ấn vào link sẽ redirect về url trong config
    const config = {
      // env trong React phải có prefix là: REACT_APP_
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    await auth.sendSignInLinkToEmail(email, config)
    toast.success(
      `Đã gửi xác nhận đến địa chỉ ${email}. Vui lòng click vào link xác nhận để hoàn thành đăng ký`
    )
    window.localStorage.setItem(EMAIL_FOR_REGISTER, email)
    form.resetFields()
  }
  const loginGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenUser = await user.getIdTokenResult()
        window.localStorage.setItem('token', idTokenUser.token)
        dispatch(notify(true))
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
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Đăng ký tài khoản của bạn
        </div>
        <button
          onClick={loginGoogle}
          className="relative mt-4 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
        >
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-red-500">
            <GoogleOutlined />
          </span>
          <span>Đăng ký với Google</span>
        </button>
        <div className="relative mt-6 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Or Đăng ký với Email
            </span>
          </div>
        </div>
        <div className="mt-6">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <FormRegister />
            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Đăng ký</span>
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
        <div className="flex justify-center items-center mt-6">
          <Link
            to={`/${PATHS.LOGIN}`}
            className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
          >
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
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <span className="ml-2">Bạn đã có tài khoản?</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {}

export default Register
