<template>
  <div>
    <h3>Sign In</h3>
    <div>
      <a href="" @click.prevent="googleLogin()">Sign In with Google</a>
    </div>
    <div>
      <a href="" @click.prevent="facebookLogin()">Sign In with Facebook</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'Login',
  methods: {
    ...mapActions(['setCurrentUser']),
    ...mapActions('habits', ['fetch']),
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          const currentUser = firebase.auth().currentUser

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
          this.$router.replace('/')
        })
        .catch(err => {
          alert('Oops, ', +err.message)
        })
    },
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
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
          this.$router.replace('/')
        })
        .catch(err => {
          alert('Oops, ', +err.message)
        })
    },
  },
}
</script>

<style scoped></style>
