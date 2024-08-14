import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = import.meta.env.VITE_APP_API_BASEURL

const request = axios.create({
  baseURL: baseURL + '/api',
  timeout: 5000
})

request.interceptors.request.use(config => {
  // 加touken
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})
request.interceptors.response.use(
  response => {
    if (response.status != 200 || response.data.code !== '0000') {
      return Promise.reject(response.data)
    }
    if (response.data.message) {
      ElMessage({
        type: 'success',
        message: response.data.message
      })
    }

    return response.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default request
