import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export const formatDate = (data) => {
  return dayjs().to(data)
}
export const strFormat = str => {
  return str + '哈哈'
}
