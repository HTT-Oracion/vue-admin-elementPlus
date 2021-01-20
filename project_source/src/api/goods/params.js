import axios from '../request'
import { ElMessageBox } from 'element-plus'
import { CATE } from '@/utils/constants'
import { successMsg, errMsg, infoMsg } from '@/utils/viewTools'

const ATTR = 'attributes'
// 获取级联选择器的列表 && 参数列表的请求
const getParamsListRequest = async () => {
  const { data } = await axios.get(CATE)
  if (data.meta.status !== 200) return errMsg('获取商品分类失败！')
  successMsg('获取成功!')
  return data.data
}
// 获取参数
const getParamsRequest = async (catId, sel) => {
  const { data } = await axios.get(`${CATE}/${catId}/${ATTR}`, {
    params: { sel }
  })
  console.log(data);
  if (data.meta.status !== 200) return errMsg('获取params列表失败')
  return data
}

// 获取 only || many 参数
const getCorrectParams = async (catId, sel) => {
  const { data } = await axios.get(`${CATE}/${catId}/${ATTR}`, {
    params: { sel }
  })
  if (data.meta.status !== 200) return errMsg('获取params失败')
  if (sel === 'many') {
    data.data.forEach(item => {
      item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
    })
    return data.data
  } else if (sel === 'only') {
    return data.data
  } else {
    return errMsg('没有该类型的参数!')
  }
}
// 保存添加的tag
const addAttrRequest = async (id, row) => {
  const { attr_name, attr_sel, attr_id } = row
  const { data } = await axios.put(`${CATE}/${id}/${ATTR}/${attr_id}`, {
    attr_name,
    attr_sel,
    attr_vals: row.attr_vals.join(" ")
  })
  if (data && data.meta.status !== 200) return errMsg('添加失败!')
  successMsg('添加成功!')
}

//  删除属性
const deleteParamsRequest = async (catId, id) => {
  const res = await ElMessageBox.confirm('是否确认删除？', '提示',
    {
      confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
    }).catch(err => err)
  if (res !== 'confirm') return infoMsg('取消了操作')
  const { data } = await axios.delete(`${CATE}/${catId}/${ATTR}/${id}`)
  if (data.meta.status !== 200) return errMsg('删除失败')
  successMsg('删除成功!')
  return data
}
// 编辑属性按钮显示当前的params详情
const currentParamRequest = async (catId, id, attr_sel) => {
  const { data } = await axios.get(`${CATE}/${catId}/${ATTR}/${id}`, {
    params: { attr_sel }
  })
  if (data.meta.status !== 200) return errMsg('获取失败,请重试!')
  return data.data
}
// 编辑属性
const editParamsRequest = async (catId, form, attr_sel) => {
  const { attr_id, attr_name } = form
  const { data } = await axios.put(`${CATE}/${catId}/${ATTR}/${attr_id}`, {
    attr_name, attr_sel
  })
  if (data.meta.status !== 200) return errMsg('修改失败!')
  successMsg('修改成功!')
}

// 添加参数
const addParamsRequest = async (catId, attr_name, attr_sel) => {
  const { data } = await axios.post(`${CATE}/${catId}/${ATTR}`, {
    attr_name, attr_sel
  })
  if (data.meta.status !== 201) return errMsg('添加失败!')
  successMsg('添加成功!')
}
export {
  getParamsListRequest,
  getParamsRequest,
  addAttrRequest,
  deleteParamsRequest,
  currentParamRequest,
  editParamsRequest,
  addParamsRequest,
  getCorrectParams
}