import request from '@/utils/request'

const getMovieApi = (params?: any) => {
  return request.get('/movie', {
    params
  })
}

const updateMovieRecommendApi = (data: any) => {
  return request.post('/update/recommend', data)
}

export { getMovieApi, updateMovieRecommendApi }
