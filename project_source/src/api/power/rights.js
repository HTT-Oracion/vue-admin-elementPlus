import axios from '../request'
import { ElMessageBox } from 'element-plus'
import { ROLES_LIST, RIGHTS } from '@/utils/constants'
import { successMsg, errMsg, infoMsg } from '@/utils/viewTools'
// 获取权限
const getRightsRequest = async () => {
  const { data } = await axios.get(`${RIGHTS}/tree`)
  if (data.meta.status !== 200) return errMsg('获取权限列表失败')
  return data.data
}

// Rights页的权限列表
const getRightsListRequest = async () => {
  const { data } = await axios.get(`${RIGHTS}/list`)
  if (data.meta.status !== 200) return errMsg('获取权限列表失败!')
  return data.data
}
const setRightsRequest = async (id, str) => {
  const { data } = await axios.post(`${ROLES_LIST}/${id}/${RIGHTS}`, {
    rids: str
  })
  if (data.meta.status !== 200) return errMsg('分配权限失败')
  successMsg('分配权限成功!')
}

const deleteRightsRequest = async (roleId, rightId) => {
  const res = await ElMessageBox.confirm(
    '此操作将永久删除该权限,是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).catch(err => err)
  if (res !== 'confirm') return infoMsg('取消了操作')
  const { data } = await axios.delete(`${ROLES_LIST}/${roleId}/${RIGHTS}/${rightId}`)
  if (data.meta.status !== 200) return errMsg('删除权限失败,请重试!')
  successMsg('删除权限成功')
  return data.data
}
export {
  getRightsRequest,
  getRightsListRequest,
  setRightsRequest,
  deleteRightsRequest
}