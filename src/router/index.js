import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '../views/Overview.vue'
import Habit from '../views/Habit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'overview',
    component: Overview,
  },
  {
    path: '/habit/:habitId',
    name: 'habit',
    component: Habit,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
