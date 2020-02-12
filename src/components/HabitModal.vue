<template>
  <modal
    name="habit-modal"
    :adaptive="true"
    :scrollable="true"
    width="290px"
    @before-open="beforeOpen"
  >
    <wrapper v-if="edit" display="block" pt="30px">
      <text-input type="text" v-model="habitTitle" />
      <a href="" @click.prevent="update()">Update Habit</a>
    </wrapper>
    <wrapper v-else display="block" pt="30px">
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
      edit: false,
      habitId: null,
    }
  },
  methods: {
    ...mapActions(['addHabit', 'updateHabit']),
    beforeOpen({
      params: { edit = false, title = '', habitId = null } = {
        edit: false,
        title: '',
        habitId: null,
      },
    }) {
      this.edit = edit
      this.habitTitle = title
      this.habitId = habitId
    },
    create() {
      this.addHabit({ title: this.habitTitle })
      this.$modal.hide('habit-modal')
    },
    update() {
      this.updateHabit({ habitId: this.habitId, title: this.habitTitle })
      this.$modal.hide('habit-modal')
    },
  },
}
</script>

<style>
.v--modal {
}
</style>
