import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { auth } from './fb-config'

import VModal from 'vue-js-modal'
Vue.use(VModal)

Vue.config.productionTip = false

let app = null
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
