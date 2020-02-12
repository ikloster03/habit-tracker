<template>
  <div id="app">
    <router-view />
    <habit-modal />
  </div>
</template>

<script>
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
}
</script>

<style></style>
