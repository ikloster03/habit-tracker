import { habits } from '@/api'

const FETCH_HABITS = 'FETCH_HABITS'

const state = {
  habits: [],
}
const getters = {
  habit: state => habitId => state.habits.find(h => h.id === habitId),
}
const actions = {
  async fetch({ commit, rootState }) {
    try {
      const data = await habits.fetch({ userId: rootState.user.uid })
      commit(FETCH_HABITS, { docs: data.docs })
    } catch (error) {
      console.error(error)
    }
  },
  async create({ dispatch, rootState }, { title }) {
    try {
      await habits.create({ userId: rootState.user.uid, data: { title } })
      await dispatch('fetch')
    } catch (error) {
      console.error(error)
    }
  },
  async update({ dispatch, rootState }, { habitId, title }) {
    try {
      await habits.update({
        userId: rootState.user.uid,
        habitId,
        data: { title },
      })
      await dispatch('fetch')
    } catch (error) {
      console.error(error)
    }
  },
  async remove({ dispatch }, { habitId }) {
    try {
      await habits.remove({ habitId })
      await dispatch('fetch')
    } catch (error) {
      console.error(error)
    }
  },
}
const mutations = {
  [FETCH_HABITS](state, { docs }) {
    state.habits = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
