import request from '@/utils/request.js'
export const sendCode = mobile => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile
  })
}
export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'

  })
}
