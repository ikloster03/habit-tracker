<template>
  <main>
    <wrapper>
      <router-link to="/">Back</router-link>
      <page-title>{{ title }}</page-title>
      <div><a href="" @click.prevent="openEditModal()">Edit</a></div>
      <div><a href="" @click.prevent="openDeleteModal()">Delete</a></div>
    </wrapper>
    <wrapper>
      <date-picker
        mode="multiple"
        v-model="dates"
        color="blue"
        is-inline
        :first-day-of-week="2"
        :max-date="new Date()"
      />
    </wrapper>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
// import moment from 'moment'
import firebase from 'firebase'
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
    ...mapState('history', ['history']),
    // ...mapGetters(['histories']),
    ...mapGetters('habits', ['habit']),
    title() {
      const habitId = this.$route.params.habitId
      const habit = this.habit(habitId)

      return habit ? habit.title : ''
    },
  },
  methods: {
    ...mapActions(['syncHistory']),
    // historiesByHabit() {
    //   const habitId = this.$route.params.habitId
    //   const history = this.histories(habitId)

    //   return history.map(h => moment(h.date, 'DD.MM.YYYY').toDate())
    // },
    openEditModal() {
      this.$modal.show('habit-modal', {
        habitId: this.$route.params.habitId,
        title: this.title,
        type: 'update',
      })
    },
    openDeleteModal() {
      this.$modal.show('habit-modal', {
        habitId: this.$route.params.habitId,
        title: this.title,
        type: 'delete',
      })
    },
  },
  watch: {
    dates: {
      handler() {
        const history = this.dates.map(date => ({
          habitId: this.$route.params.habitId,
          date: firebase.firestore.Timestamp.fromDate(date),
        }))
        console.log('history', history)
        // this.syncHistory({
        //   habitId: this.$route.params.habitId,
        //   dates: this.dates,
        // })
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
    // this.dates = this.historiesByHabit()
  },
}
</script>

<style lang="css" scoped></style>
