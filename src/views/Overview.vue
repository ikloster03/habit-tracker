<template>
  <main>
    <page-title>Overview</page-title>
    <overview>
      <overview-row>
        <overview-column>
          <overview-title>Habits</overview-title>
        </overview-column>
        <overview-column
          v-for="(day, col) in getLastNDays(FIVE_DAYS)"
          :key="`habit-col-${col}`"
        >
          <overview-title>{{ day | formatDay }}</overview-title>
        </overview-column>
      </overview-row>
      <overview-row v-for="habit in habits" :key="`habit-${habit.id}`">
        <overview-column>
          <router-link :to="{ name: 'habit', params: { habitId: habit.id } }">
            {{ habit.title }}
          </router-link>
        </overview-column>
        <overview-column
          v-for="(day, col) in getLastNDays(FIVE_DAYS)"
          :key="`habit-col-${col}`"
        >
          <div v-if="isHabitMark(habit.id, formatDate(day))">x</div>
          <div></div>
        </overview-column>
      </overview-row>
    </overview>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import PageTitle from '@/components/PageTitle'
import Overview, {
  OverviewRow,
  OverviewColumn,
  OverviewTitle,
} from '@/components/Overview'

// const HabitTitle = styled.a`
//   font-size: 14px;
//   color: palevioletred;
//   text-decoration: none;
// `

export default {
  name: 'Overview',
  components: {
    'overview': Overview,
    'page-title': PageTitle,
    'overview-row': OverviewRow,
    'overview-column': OverviewColumn,
    'overview-title': OverviewTitle,
    // 'habit-title': HabitTitle,
  },
  computed: {
    ...mapState(['habits', 'habitHistories']),
    ...mapGetters(['isHabitMark']),
  },
  filters: {
    formatDay(m) {
      return m.format('DD')
    },
  },
  methods: {
    moment: moment,
    formatDate(m) {
      return m.format('DD.MM.YYYY')
    },
    getLastNDays(n) {
      let days = []

      for (let i = 1; i <= n; i++) {
        days.push(moment().subtract(n - i, 'd'))
      }

      return days
    },
  },
  data() {
    return {
      FIVE_DAYS: 5,
    }
  },
}
</script>

<style lang="css" scoped></style>
