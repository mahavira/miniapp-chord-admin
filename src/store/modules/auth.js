/* ============
 * Auth Module
 * ============
 */
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    check (state) {
      state.token = localStorage.getItem('token') || 'x'
      if (state.token) {
        Vue.$http.defaults.headers.common.Authorization = state.token
      }
    },
    register () {
      //
    },
    login (state, token) {
      state.token = token
      localStorage.setItem('token', token)
      Vue.$http.defaults.headers.common.Authorization = token
    },
    /**
     * 记住密码
     */
    remember (state, account) {
      if (account.remember) {
        account.remember = 1
        localStorage.setItem('remember', account)
      } else {
        localStorage.removeItem('remember')
      }
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      Vue.$http.defaults.headers.common.Authorization = ''
    }
  },
  actions: {
    logout ({ commit }) {
      commit('logout')
      Vue.router.push('/login')
    }
  }
}
