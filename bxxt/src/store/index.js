import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      isLogin: false,
      username: '',
      identity: '',
    },
  },
  getters: {
  },
  mutations: {
    setIslogin(state, payload) {
      state.user.isLogin = payload;
    },
    setUserInfo(state, payload) {
      state.user.username = payload.username;
      state.user.identity = payload.identity;
    }
  },
  actions: {
  },
  modules: {
  }
})
