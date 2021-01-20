import axios from 'axios'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const APP_BASE_URL = 'http://timemeetyou.com:8889/api/private/v1/'
const http = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 1000 * 12
})

http.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user
  store.commit('setLoading', true)
  NProgress.start()
  return config
})

http.interceptors.response.use(response => {
  const { data } = response
  if (data) {
    store.commit('setLoading', false)
    NProgress.done()
    return response
  }
}, err => Promise.reject(err))


export default http