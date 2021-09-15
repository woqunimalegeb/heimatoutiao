import request from '@/utils/request.js'
export const sendCode = mobile => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'

  })
}
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
export const addFollowUser = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
export const removeFollowUser = target => {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
