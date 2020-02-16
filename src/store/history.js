import moment from 'moment'
import { history } from '@/api'

const FETCH_HISTORY = 'FETCH_HISTORY'
const SYNC_HISTORY = 'SYNC_HISTORY'

const state = {
  history: [],
}
const getters = {
  isHabitMark: state => (habitId, date) =>
    state.history.find(h => h.habit_id === habitId && h.date === date),
  histories: state => habitId =>
    state.history.filter(h => h.habit_id === habitId),
}
const actions = {
  async fetch({ commit, rootState }) {
    try {
      const { docs } = await history.fetch({ userId: rootState.user.uid })
      commit(FETCH_HISTORY, { docs })
    } catch (error) {
      console.error(error)
    }
  },
  async create({ dispatch, rootState }, { title }) {
    try {
      await history.create({ userId: rootState.user.uid, data: { title } })
      await dispatch('fetch')
    } catch (error) {
      console.error(error)
    }
  },
  async update({ dispatch }, { habitId, title }) {
    try {
      await history.update({
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
      await history.remove({ habitId })
      await dispatch('fetch')
    } catch (error) {
      console.error(error)
    }
  },
  syncHistory({ commit, getters, state }, { habitId, dates }) {
    let maxId = parseInt(getters.maxHistoryId) ? getters.maxHistoryId : 0
    let userId = state.user.uid
    commit(SYNC_HISTORY, { habitId, dates, maxId, userId })
  },
}
const mutations = {
  [FETCH_HISTORY](state, { docs }) {
    state.history = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  },
  [SYNC_HISTORY](state, { habitId, dates, maxId, userId }) {
    state.history = state.history.filter(h => h.habit_id !== habitId)

    for (let i = 0; i < dates.length; i++) {
      state.history.push({
        id: i + maxId + 1,
        habit_id: habitId,
        date: moment(dates[i]).format('DD.MM.YYYY'),
        userId,
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
