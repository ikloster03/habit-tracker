<template>
  <modal name="habit-modal" :adaptive="true" :scrollable="true" width="290px">
    <wrapper display="block" pt="30px">
      <text-input type="text" v-model="habitTitle" />
      <a href="" @click.prevent="create()">Create Habit</a>
    </wrapper>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'
import Wrapper from '@/components/Wrapper'
import TextInput from '@/components/TextInput'

export default {
  name: 'HabitModal',
  components: {
    Wrapper,
    'text-input': TextInput,
  },
  data() {
    return {
      habitTitle: '',
    }
  },
  methods: {
    ...mapActions(['addHabit']),
    create() {
      this.addHabit({ title: this.habitTitle })
      this.$modal.hide('habit-modal')
    },
  },
}
</script>

<style>
.v--modal {
}
</style>
