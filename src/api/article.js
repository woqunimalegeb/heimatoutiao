import request from '@/utils/request.js'
export const getArticleList = params => {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}
export const getArticleDetail = id => {
  return request({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}
export const addCollected = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
export const removeCollected = target => {
  return request({
    url: '/v1_0/article/collections/' + target,
    method: 'DELETE'
  })
}
export const getCommentList = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
export const postComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
