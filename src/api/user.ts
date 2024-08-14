import request from '@/utils/request'

const getUserApi = (params?: string) => {
  if (params == null) {
    return request.get('/user')
  }
  return request.get('/user', { params })
}

const updateUserApi = (data: any) => {
  return request.post('/update/user', data)
}

export { getUserApi, updateUserApi }
