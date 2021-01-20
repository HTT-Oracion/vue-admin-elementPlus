import axios from '../request'
import { ORDER } from '@/utils/constants'
import { errMsg, infoMsg } from '@/utils/viewTools'
import _ from 'loadsh'

const EXPRESS = 804909574412544580
export const getOrdersRequest = async info => {
  const { data } = await axios.get(ORDER, {
    params: info
  })
  if (data.meta.status !== 200) return errMsg('获取数据失败')
  return {
    orderList: _.cloneDeep(data.data.goods),
    total: data.data.total
  }
}
export const getExpressRequest = async () => {
  return infoMsg('接口有误,功能未完善!')
  const { data } = axios.get(`/kuaidi/${EXPRESS}`)
}