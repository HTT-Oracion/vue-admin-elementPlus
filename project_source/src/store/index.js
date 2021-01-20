import { createStore } from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import { USER_TOKEN, ACTIVE_PATH } from '@/utils/constants'
export default createStore({
  state: {
    user: getItem(USER_TOKEN),
    activePath: getItem(ACTIVE_PATH),
    loading: false
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_TOKEN, state.user)
    },
    setActivePath (state, active) {
      state.activePath = active
      setItem(ACTIVE_PATH, state.activePath)
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },
  actions: {
  },
  modules: {
  }
})
