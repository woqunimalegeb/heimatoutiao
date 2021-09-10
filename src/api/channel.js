import request from '@/utils/request.js'
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
export const addUserChannel = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}
export const deleteUserChannel = id => {
  return request({
    url: '/v1_0/user/channels/' + id,
    method: 'DELETE'

  })
}
