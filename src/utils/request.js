import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app'
  baseURL: 'http://toutiao-app.itheima.net'
})
request.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  if (config.url !== '/v1_1/articles' && config.uri !== '/v1-0/search') {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true
    })
  }
  return config
})
request.interceptors.response.use(res => {
  Toast.clear()
  return res.data.data
})

export default request
