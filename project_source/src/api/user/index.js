import axios from '../request'
import _ from 'loadsh'
import { ElMessageBox } from 'element-plus'
import { successMsg, errMsg, infoMsg } from '@/utils/viewTools'
import { USERS_LIST } from '@/utils/constants'
// 用户列表
const getUsersRequest = async (info) => {
  const { data } = await axios.get(USERS_LIST, {
    params: info
  })
  console.log('userList', data.data.users)
  return {
    userList: _.cloneDeep(data.data.users),
    total: data.data.total
  }
}

// 角色列表
const getRolesRequest = async () => {
  const { data } = await axios.get('roles')
  return data.data
}
// 编辑用户时，显示当前用户信息
const showCurrentUser = async (id) => {
  const { data } = await axios.get(`${USERS_LIST}/${id}`)
  if (data.meta.status !== 200) errMsg('查询用户信息失败')
  return data.data
}
// 修改用户信息
const editUserRequest = async (formRef) => {
  const { id, email, mobile } = formRef.value.model
  const { data } = await axios.put('users/' + id, {
    email,
    mobile
  })
  if (data.meta.status !== 200) return errMsg('编辑用户信息失败!')
}
// 删除用户

const deteleUserRequest = async id => {
  const res = await ElMessageBox.confirm('确认删除当前用户吗？此操作无法撤回！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(err => err)
  if (res !== 'confirm') return infoMsg('取消了操作')
  const { data } = await axios.delete(`${USERS_LIST}/` + id)
  if (data.meta.status !== 200) return errMsg('删除用户失败,请重试!')
  successMsg('删除成功!')
  return data.data
}

// 添加用户
const addUserRequest = async form => {
  console.log(form);
  const { data } = await axios.post(USERS_LIST, form)
  if (data.meta.status !== 201) return errMsg('添加失败,请重试!')
  successMsg('添加用户成功!')
}
// 更改用户状态
const changeStateRequest = async row => {
  const { data } = await axios.put(`${USERS_LIST}/${row.id}/state/${row.mg_state}`)
  if (data.meta.status !== 200) {
    errMsg('设置状态失败!')
    return !row.mg_state
  } else {
    successMsg('设置状态成功!')
    return row.mg_state
  }
}
export {
  getUsersRequest,
  getRolesRequest,
  showCurrentUser,
  editUserRequest,
  deteleUserRequest,
  addUserRequest,
  changeStateRequest
}