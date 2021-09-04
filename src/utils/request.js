import axios from 'axios'
import { Toast } from 'vant'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use(config => {
  Toast.loading({
    message: '登录中...',
    duration: 0,
    forbidClick: true
  })
  return config
})
export default request
