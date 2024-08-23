import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAdminStore } from '@/store/admin'

const { removeAdminState } = useAdminStore()

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
  config.headers['Environment'] = 'Admin'
  return config
})

request.interceptors.response.use(
  response => {
    if (response.data.message) {
      let message = response.data.message
      ElMessage({
        type: message.type,
        message: message.message
      })
    }

    if (response.status != 200 || response.data.code !== '0000') {
      if (response.data.code == '0003') removeAdminState()

      return Promise.reject(response.data)
    }
    return response.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default request
