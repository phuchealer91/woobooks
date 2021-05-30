import axios from 'axios'
import { auth } from '../firebase'
import { TOKEN } from '../redux/constants/keys'
const baseURL = 'http://localhost:8000/api'

const getFirebaseToken = async () => {
  const currentUser = auth.currentUser
  if (currentUser) return currentUser.getIdToken()

  // Not logged in
  const hasRememberedAccount = localStorage.getItem('token')
  if (!hasRememberedAccount) return null

  // Logged in but current user is not fetched --> wait (10s)
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null)
    }, 10000)

    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        reject(null)
      }

      const token = await user.getIdToken()
      resolve(token)

      unregisterAuthObserver()
      clearTimeout(waitTimer)
    })
  })
}
class AxiosServices {
  constructor() {
    const instance = axios.create({
      baseURL,
    })
    instance.interceptors.request.use(async (config) => {
      const token = await getFirebaseToken()
      if (token) {
        config.headers.authorization = token
      }
      return config
    }, this.handleFail)
    instance.interceptors.response.use(this.handleSuccess, this.handleFail)
    this.instance = instance
  }

  handleSuccess = (response) => {
    return response
  }
  handleFail = (error) => {
    return Promise.reject(error)
  }
  get(url) {
    return this.instance.get(url)
  }
  post(url, data) {
    return this.instance.post(url, data)
  }
  put(url, data) {
    return this.instance.put(url, data)
  }
  patch(url, data) {
    return this.instance.patch(url, data)
  }
  delete(url) {
    return this.instance.delete(url)
  }
}

export default new AxiosServices()
