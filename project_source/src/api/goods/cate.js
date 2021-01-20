import axios from '../request'
import { CATE } from '@/utils/constants'
import { errMsg } from '@/utils/viewTools'
import _ from 'loadsh'
export const getCateListRequest = async info => {
  const { data } = await axios.get(CATE, {
    params: info
  })
  if (data.meta.status !== 200) return errMsg('获取分类列表失败!')
  return {
    cateList: _.cloneDeep(data.data.result),
    total: data.data.total
  }
}
export const getParentListReq = async () => {
  const { data } = await axios.get(CATE, {
    params: { type: 2 }
  })
  if (data.meta.status !== 200) return errMsg('获取数据失败!')
  return data.data
}