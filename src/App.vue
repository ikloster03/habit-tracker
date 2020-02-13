<template>
  <div id="app">
    <router-view />
    <habit-modal />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
import { injectGlobal } from 'vue-styled-components'
import HabitModal from '@/components/HabitModal.vue'

injectGlobal`
  #app, #app * {
    box-sizing: border-box;
  }
	body {
		margin: 0;
    padding: 0;
	}
`

export default {
  name: 'App',
  components: {
    'habit-modal': HabitModal,
  },
  methods: {
    ...mapActions(['setCurrentUser']),
  },
  created() {
    const currentUser = firebase.auth().currentUser

    if (currentUser) {
      this.setCurrentUser({
        user: {
          name: currentUser.displayName,
          email: currentUser.email,
          image: currentUser.photoURL,
        },
      })
    }
  },
}
</script>

<style></style>
