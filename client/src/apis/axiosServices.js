import axios from 'axios'
import { TOKEN } from '../redux/constants/keys'
const baseURL = 'https://mbooks-app.herokuapp.com/api'

class AxiosServices {
  constructor() {
    const instance = axios.create({
      baseURL,
    })
    instance.interceptors.request.use(async (config) => {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        config.headers.authorization = token
        console.log(
          'config.headers.authorization',
          config.headers.authorization
        )
      }
      return config
    }, this.handleFail)
    instance.interceptors.response.use(this.handleSuccess, this.handleFail)
    this.instance = instance
  }

  handleSuccess = (response) => {
    console.log('respon', response)

    return response
  }
  handleFail = (error) => {
    console.log('error en axios', error)
    console.log('error en axios', error)

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
