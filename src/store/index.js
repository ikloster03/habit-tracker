import Vue from 'vue'
import Vuex from 'vuex'
import habits from '@/store/habits'
import history from '@/store/history'

Vue.use(Vuex)

const SET_USER = 'SET_USER'

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    [SET_USER](state, { user }) {
      state.user = user
    },
  },
  actions: {
    setCurrentUser({ commit }, { user }) {
      commit(SET_USER, { user })
    },
  },
  modules: {
    habits,
    history,
  },
})
