import axios from '../request'
import { LOGIN_URL } from '@/utils/constants'
import { successMsg, errMsg } from '@/utils/viewTools'
import { storageClear } from '@/utils/storage'
export const loginRequest = async (loginForm, $router, $store) => {
  const val = loginForm.value.model
  const { data } = await axios.post(LOGIN_URL, val)
  if (data.meta.status !== 200) return errMsg(data.meta.msg)
  $store.commit('setUser', data.data.token)
  successMsg('登陆成功,欢迎回来!')
  $router.push('/home')
}
export const logoutRequest = async ($router) => {
  storageClear()
  $router.push('/login')
}
