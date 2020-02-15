import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { getHistory } from '@/api'
import habits from '@/store/habits'

Vue.use(Vuex)

const SYNC_HISTORY = 'SYNC_HISTORY'
const FETCH_HISTORY = 'FETCH_HISTORY'
const SET_USER = 'SET_USER'

export default new Vuex.Store({
  state: {
    history: [
      // { id: 1, habit_id: 1, date: '11.02.2020' },
      // { id: 2, habit_id: 2, date: '10.02.2020' },
      // { id: 3, habit_id: 3, date: '09.02.2020' },
      // { id: 4, habit_id: 3, date: '10.02.2020' },
      // { id: 5, habit_id: 4, date: '08.02.2020' },
      // { id: 6, habit_id: 5, date: '09.02.2020' },
    ],
    user: null,
  },
  getters: {
    isHabitMark: state => (habitId, date) =>
      state.history.find(h => h.habit_id === habitId && h.date === date),
    histories: state => habitId =>
      state.history.filter(h => h.habit_id === habitId),
  },
  mutations: {
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
    [SET_USER](state, { user }) {
      state.user = user
    },
  },
  actions: {
    async fetchHistory({ commit, state }) {
      try {
        const data = await getHistory({ userId: state.user.uid })
        commit(FETCH_HISTORY, { docs: data.docs })
      } catch (error) {
        console.error(error)
      }
    },
    syncHistory({ commit, getters, state }, { habitId, dates }) {
      let maxId = parseInt(getters.maxHistoryId) ? getters.maxHistoryId : 0
      let userId = state.user.uid
      commit(SYNC_HISTORY, { habitId, dates, maxId, userId })
    },
    setCurrentUser({ commit }, { user }) {
      commit(SET_USER, { user })
    },
  },
  modules: {
    habits,
  },
})
