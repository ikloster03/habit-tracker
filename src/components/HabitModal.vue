<template>
  <modal
    name="habit-modal"
    :adaptive="true"
    :scrollable="true"
    width="290px"
    @before-open="beforeOpen"
  >
    <wrapper v-if="type === 'create'" display="block" pt="30px">
      <text-input type="text" v-model="habitTitle" />
      <a href="" @click.prevent="submit()">Create Habit</a>
    </wrapper>
    <wrapper v-if="type === 'update'" display="block" pt="30px">
      <text-input type="text" v-model="habitTitle" />
      <a href="" @click.prevent="submit()">Update Habit</a>
    </wrapper>
    <wrapper v-if="type === 'delete'" display="block" pt="30px">
      <a href="" @click.prevent="submit()">Delete Habit</a>
    </wrapper>
  </modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
      type: '',
      habitId: null,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions('habits', ['create', 'update', 'remove']),
    beforeOpen({
      params: { type = '', title = '', habitId = null } = {
        type: '',
        title: '',
        habitId: null,
      },
    }) {
      this.type = type
      this.habitTitle = title
      this.habitId = habitId
    },
    async submit() {
      if (this.type === 'create') {
        await this.create({ title: this.habitTitle })
      } else if (this.type === 'update') {
        await this.update({ habitId: this.habitId, title: this.habitTitle })
      } else if (this.type === 'delete') {
        await this.remove({ habitId: this.habitId })
        this.$router.replace('/')
      }

      this.$modal.hide('habit-modal')
    },
  },
}
</script>

<style>
.v--modal {
}
</style>
