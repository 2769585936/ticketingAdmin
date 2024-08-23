import request from '@/utils/request'

const getCinemaApi = (params?: any) => {
  return request.get('/cinemas', {
    params
  })
}

const updateCinemaApi = (data?: any) => {
  return request.post('/update/cinema', data)
}

const deleteCinemaApi = (data?: any) => {
  return request.post('/delete/cinema', data)
}

const addCinameApi = (data?: any) => {
  return request.post('/add/cinema', data)
}

export { getCinemaApi, updateCinemaApi, deleteCinemaApi, addCinameApi }
