<template>
  <div>
    <h3>Sign In</h3>
    <div>
      <a href="" @click.prevent="googleLogin()">Sign In with Google</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          console.log('data', data)
          // this.$router.replace('home')
        })
        .catch(err => {
          alert('Oops, ', +err.message)
        })
    },
  },
}
</script>

<style scoped></style>
