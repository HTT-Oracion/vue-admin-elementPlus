import axios from '../request'
import { REPORT } from '@/utils/constants'
import { errMsg } from '@/utils/viewTools'
import _ from 'loadsh'

export const getReportRequest = async options => {
  const { data } = await axios.get(`${REPORT}/type/1`)
  if (data.meta.status !== 200) return errMsg('获取报表失败')
  return _.merge(options, data.data)
}