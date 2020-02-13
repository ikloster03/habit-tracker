import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
// import firebase from 'firebase/app'
// import 'firebase/database'

Vue.use(Vuex)

// export const db = firebase
//   .initializeApp({ databaseURL: process.env.VUE_APP_FIREBASE_URL })
//   .database()

const SYNC_HISTORY = 'SYNC_HISTORY'
const ADD_HABIT = 'ADD_HABIT'
const UPDATE_HABIT = 'UPDATE_HABIT'
const SET_USER = 'SET_USER'

export default new Vuex.Store({
  state: {
    habits: [
      { id: 1, title: 'Sport' },
      { id: 2, title: 'Meditation' },
      { id: 3, title: 'Writing' },
      { id: 4, title: 'Meeting' },
      { id: 5, title: 'Play table tennis' },
    ],
    habitHistories: [
      { id: 1, habit_id: 1, date: '11.02.2020' },
      { id: 2, habit_id: 2, date: '10.02.2020' },
      { id: 3, habit_id: 3, date: '09.02.2020' },
      { id: 4, habit_id: 3, date: '10.02.2020' },
      { id: 5, habit_id: 4, date: '08.02.2020' },
      { id: 6, habit_id: 5, date: '09.02.2020' },
    ],
    user: null,
  },
  getters: {
    habit: state => habitId => state.habits.find(h => h.id === habitId),
    maxHabitId: state => Math.max(...state.habits.map(h => h.id)),
    isHabitMark: state => (habitId, date) =>
      state.habitHistories.find(h => h.habit_id === habitId && h.date === date),
    histories: state => habitId =>
      state.habitHistories.filter(h => h.habit_id === habitId),
    maxHistoryId: state => Math.max(...state.habitHistories.map(h => h.id)),
  },
  mutations: {
    [ADD_HABIT](state, { habitId, title }) {
      state.habits.push({
        id: habitId,
        title,
      })
    },
    [UPDATE_HABIT](state, { habitId, title }) {
      const habit = state.habits.find(h => h.id === habitId)
      habit.title = title
    },
    [SYNC_HISTORY](state, { habitId, dates, maxId }) {
      state.habitHistories = state.habitHistories.filter(
        h => h.habit_id !== habitId,
      )

      for (let i = 0; i < dates.length; i++) {
        state.habitHistories.push({
          id: i + maxId + 1,
          habit_id: habitId,
          date: moment(dates[i]).format('DD.MM.YYYY'),
        })
      }
    },
    [SET_USER](state, { user }) {
      state.user = user
    },
  },
  actions: {
    addHabit({ commit, getters }, { title }) {
      let habitId = getters.maxHabitId + 1
      commit(ADD_HABIT, { habitId, title })
    },
    updateHabit({ commit }, { habitId, title }) {
      commit(UPDATE_HABIT, { habitId, title })
    },
    syncHistory({ commit, getters }, { habitId, dates }) {
      let maxId = getters.maxHistoryId
      commit(SYNC_HISTORY, { habitId, dates, maxId })
    },
    setCurrentUser({ commit }, { user }) {
      commit(SET_USER, { user })
    },
  },
  modules: {},
})
