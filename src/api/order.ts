import request from '@/utils/request'

const getOrdersApi = (params: any) => {
  return request.get('/orders', {
    params
  })
}

export { getOrdersApi }
