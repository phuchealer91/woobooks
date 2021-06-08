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
import { loginInUser, logoutInUser } from '../../../redux/actions/users'
import PATHS from '../../../redux/constants/paths'
import FormLogin from './FormLogin'
import './Login.scss'
// import useLoginUser from '../../../hooks/useLoginUser'
const Login = (props) => {
  // useCheckAdmin()
  // useAuthUser()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))
  function autoLogout() {
    auth.signOut()
    localStorage.removeItem('token')
    dispatch(logoutInUser())
    history.push(`/${PATHS.ADMIN}/${PATHS.LOGIN}`)
  }
  // useEffect(() => {
  //   let intended = history.location.state
  //   if (intended) {
  //     return
  //   } else {
  //     if (user && user.token) {
  //       history.push('/admin/dashboard')
  //     }
  //   }
  // }, [user, history])

  const roleBasedRedirect = (res) => {
    let intended = history.location.state
    if (intended) {
      history.push(intended.from)
    } else {
      if (res.data.role === 'admin') {
        toast.success('Đăng nhập thành công !')
        history.push('/admin/dashboard')
      } else {
        toast.error('Đăng nhập thất bại!')
        autoLogout()
        // history.push('/admin/login')
      }
    }
  }

  const onFinish = async ({ email, password }) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const { user } = result
      const token = await user.getIdToken()
      window.localStorage.setItem('token', token)
      registerOrUpdateUsers(token).then((res) => {
        if (res.data) {
          const data = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            token: token,
            userDatas: res.data,
            notificationsCount: res.data.notifications.newNotifications,
            role: res.data.role,
            _id: res.data._id,
          }
          dispatch(loginInUser(data))
          roleBasedRedirect(res)
        }
      })
      // dispatch(loginInUser(data))

      // history.push(`${PATHS.HOME}`)
      // useLoginUser(result, 'Đăng nhập thành công', PATHS.HOME)
      // CheckAdmin()
    } catch (error) {
      toast.error('Email hoặc mật khẩu không đúng.')
    }
  }
  const loginGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const token = await user.getIdToken()
        window.localStorage.setItem('token', token)
        registerOrUpdateUsers(token).then((res) => {
          if (res.data) {
            const data = {
              name: res.data.name,
              email: res.data.email,
              photoURL: res.data.photoURL,
              token: token,
              userDatas: res.data,
              notificationsCount: res.data.notifications.newNotifications,
              role: res.data.role,
              _id: res.data._id,
            }
            dispatch(loginInUser(data))
            roleBasedRedirect(res)
          }
        })
        // history.push(`${PATHS.HOME}`)
      })
      .catch((error) => {
        toast.error('Email hoặc mật khẩu không đúng.')
      })
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Đăng nhập ADMIN
        </div>
        {/* <button className="relative mt-4 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
            <i className="fab fa-facebook-f" />
          </span>
          <span>Login with Facebook</span>
        </button> */}
        <button
          onClick={loginGoogle}
          className="relative mt-4 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
        >
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-red-500">
            <GoogleOutlined />
          </span>
          <span>Đăng nhập với Google</span>
        </button>
        <div className="relative mt-6 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Or Đăng nhập với Email
            </span>
          </div>
        </div>
        <div className="mt-6">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <FormLogin loginGoogle={loginGoogle} />

            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <Link
                  to={`/${PATHS.FORGOT}/${PATHS.PASSWORD}`}
                  className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Đăng nhập</span>

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
            to="/"
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
            <span className="ml-2">Trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {}

export default Login
