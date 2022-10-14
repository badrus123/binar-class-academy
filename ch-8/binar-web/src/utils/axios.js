import axios from 'axios'
import { get } from 'lodash'
axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.timeout = 180000 // 30 seconds
axios.interceptors.request.use(
  async (response) => {
    const originalConfig = response
    const cookie = await localStorage.getItem('_q')
    const userToken = cookie
    if (userToken) {
      originalConfig.headers.Authorization = `Bearer ${cookie}`
    }
    originalConfig.headers['Access-Control-Allow-Origin'] = '*'
    originalConfig.headers.Accept = 'application/json'
    originalConfig.headers['Content-Type'] = 'application/json; charset=utf-8'

    return originalConfig
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)

    if (
      get(error, 'response.data.errorCode', '') === '401' ||
      get(error, 'response.data.message', '') === 'Unauthorized'
    ) {
      localStorage.removeItem('_q')
      window.location.reload()
    }
    return Promise.reject(error)
  },
)

export default axios
