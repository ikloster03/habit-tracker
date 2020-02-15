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
    ...mapActions('habits', ['fetch']),
  },
  created() {
    const currentUser = firebase.auth().currentUser
    // console.log('currentUser', currentUser)
    if (currentUser) {
      this.setCurrentUser({
        user: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          image: currentUser.photoURL,
        },
      })
      this.fetch()
    }
  },
}
</script>

<style></style>
