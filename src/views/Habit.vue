<template>
  <main>
    <wrapper>
      <router-link to="/">Back</router-link>
      <page-title>{{ title }}</page-title>
      <a href="" @click.prevent="openModal()">Edit</a>
    </wrapper>
    <wrapper>
      <date-picker mode="multiple" v-model="dates" color="blue" is-inline />
    </wrapper>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
// import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import PageTitle from '@/components/PageTitle'
import Wrapper from '@/components/Wrapper'

export default {
  name: 'Habit',
  components: {
    'page-title': PageTitle,
    Wrapper,
    DatePicker,
  },
  computed: {
    ...mapState(['habitHistories']),
    ...mapGetters(['habit', 'histories']),
    title() {
      const habitId = parseInt(this.$route.params.habitId)
      const habit = this.habit(habitId)

      return habit ? habit.title : ''
    },
  },
  methods: {
    ...mapActions(['syncHistory']),
    historiesByHabit() {
      const habitId = parseInt(this.$route.params.habitId)
      const habitHistories = this.histories(habitId)

      return habitHistories.map(h => moment(h.date, 'DD.MM.YYYY').toDate())
    },
    openModal() {
      this.$modal.show('habit-modal', {
        habitId: parseInt(this.$route.params.habitId),
        title: this.title,
        edit: true,
      })
    },
  },
  watch: {
    dates: {
      handler() {
        this.syncHistory({
          habitId: parseInt(this.$route.params.habitId),
          dates: this.dates,
        })
      },
      deep: true,
    },
  },
  data() {
    return {
      dates: [],
    }
  },
  mounted() {
    this.dates = this.historiesByHabit()
  },
}
</script>

<style lang="css" scoped></style>
