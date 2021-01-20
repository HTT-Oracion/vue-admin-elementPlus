import axios from '../request'
import { errMsg } from '@/utils/viewTools'
import { MENUS_LIST } from '@/utils/constants'

const getMenuRequest = async () => {
  const { data } = await axios.get(MENUS_LIST)
  if (data.meta.status !== 200) return errMsg('获取侧边栏菜单失败')
  console.log('menusList', data.data);
  return data.data
}

export {
  getMenuRequest
}