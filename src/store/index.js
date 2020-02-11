import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from 'firebase/app'
// import 'firebase/database'

Vue.use(Vuex)

// export const db = firebase
//   .initializeApp({ databaseURL: process.env.VUE_APP_FIREBASE_URL })
//   .database()

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
  },
  getters: {
    habit: state => habitId => state.habits.find(h => h.id === habitId),
    isHabitMark: state => (habitId, date) =>
      state.habitHistories.find(h => h.habit_id === habitId && h.date === date),
    histories: state => habitId =>
      state.habitHistories.filter(h => h.id === habitId),
  },
  mutations: {
    addHabit(state, habit) {
      state.habits.push(habit)
    },
  },
  actions: {},
  modules: {},
})
