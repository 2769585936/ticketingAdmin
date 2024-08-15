import request from '@/utils/request'

const getCinemaApi = (params?: any) => {
  return request.get('/cinemas', params)
}

export { getCinemaApi }
