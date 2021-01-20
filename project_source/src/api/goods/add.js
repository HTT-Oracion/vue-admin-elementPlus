import axios from '../request'
import { CATE, GOODS } from '@/utils/constants'
import { successMsg, errMsg } from '@/utils/viewTools'

const addGoodRequest = async (form, $router) => {
  const { data } = await axios.post(GOODS, form)
  console.log('添加商品', data);
  if (data.meta.status !== 201) return errMsg(data.meta.msg)
  successMsg('添加成功')
  $router.push(`/${GOODS}`)
}
const addCateRequest = async form => {
  const { data } = await axios.post(CATE, form)
  if (data.meta.status !== 201) return errMsg('添加失败!')
  successMsg('添加分类成功!')
}
export {
  addGoodRequest,
  addCateRequest
}