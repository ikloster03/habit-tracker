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
      { id: 1, habit_id: 1, date: '10.02.20' },
      { id: 2, habit_id: 2, date: '10.02.20' },
      { id: 3, habit_id: 3, date: '09.02.20' },
      { id: 4, habit_id: 3, date: '10.02.20' },
    ],
  },
  mutations: {
    addHabit(state, habit) {
      state.habits.push(habit)
    },
  },
  actions: {},
  modules: {},
})
