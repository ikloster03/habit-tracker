<template>
  <push noOverlay width="260">
    <wrapper v-if="user" direction="column">
      <img :src="user.image" alt="" class="image" />
      <wrapper>{{ user.email }}</wrapper>
      <wrapper>{{ user.name }}</wrapper>
      <wrapper>
        <a href="" @click.prevent="logout()">Log Out</a>
      </wrapper>
    </wrapper>
  </push>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
import { Push } from 'vue-burger-menu'
import Wrapper from '@/components/Wrapper'
export default {
  name: 'Sidebar',
  components: {
    Push,
    Wrapper,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/login')
          window.location.reload()
        })
    },
  },
}
</script>

<style scoped>
.image {
  width: 32px;
  height: 32px;
}
</style>
