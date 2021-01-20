import axios from '../request'
import { ElMessageBox } from 'element-plus'
import { GOODS } from '@/utils/constants'
import { successMsg, errMsg } from '@/utils/viewTools'
import _ from 'loadsh'
const getGoodsRequest = async info => {
  const { data } = await axios.get(GOODS, {
    params: info
  })
  if (data.meta.status !== 200) return errMsg('获取商品列表失败')
  successMsg('获取商品列表成功')
  return {
    goodsList: _.cloneDeep(data.data.goods),
    total: data.data.total
  }
}
const deleteGoodRequest = async id => {
  const res = await ElMessageBox.confirm(
    '是否确定永久删除?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).catch(err => err)
  if (res !== 'confirm') return errMsg('取消了删除')
  const { data } = await axios.delete(`${GOODS}/${id}`)
  if (data.meta.status !== 200) return errMsg('删除失败!')
  successMsg('删除成功!')
  return data
}
export {
  getGoodsRequest,
  deleteGoodRequest
}