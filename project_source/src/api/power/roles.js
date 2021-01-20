import axios from '../request'
import { successMsg, errMsg } from '@/utils/viewTools'
import { ROLES_LIST } from '@/utils/constants'

const getRolesRequest = async () => {
  const { data } = await axios.get(ROLES_LIST)
  if (data.meta.status !== 200) return errMsg('获取权限列表失败!')
  return data.data
}

export {
  getRolesRequest
}