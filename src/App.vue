<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { injectGlobal } from 'vue-styled-components'

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
}
</script>

<style></style>
