import request from '@/utils/request'

const getTagsApi = () => {
  return request.get('/tags')
}

export { getTagsApi }
