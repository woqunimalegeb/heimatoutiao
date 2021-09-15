import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import JSONBig from 'json-bigint'
// const json = '{"art_id": 1323815043883597824}'
// console.log(JSON.parse(json))
// console.log(JSONBig.parse(json).art_id + '')
const request = axios.create({
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }],
  // baseURL: 'http://ttapi.research.itcast.cn/app'
  baseURL: 'http://toutiao-app.itheima.net'
})
const notLoading = ['/v1_1/articles', '/v1_0/search', '/v1_0/comments']
request.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  const isDetail = /\/v1_0\/article\/\d+/.test(config.url)
  if (notLoading.indexOf(config.url) === -1 && !isDetail) {
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
