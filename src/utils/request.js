import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use(config => {
  if (config.url.indexOf('/user') !== -1) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  Toast.loading({
    message: '加载中...',
    duration: 0,
    forbidClick: true
  })
  return config
})
request.interceptors.response.use(res => {
  Toast.clear()
  return res.data.data
})

export default request
