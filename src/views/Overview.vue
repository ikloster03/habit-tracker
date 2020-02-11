<template>
  <overview>
    <overview-row>
      <overview-column>
        <overview-title>Habits</overview-title>
      </overview-column>
      <overview-column
        v-for="(day, col) in getLastNDays(FIVE_DAYS)"
        :key="`habit-col-${col}`"
      >
        <overview-title>{{ day | formatDayMounth }}</overview-title>
      </overview-column>
    </overview-row>
    <overview-row v-for="habit in habits" :key="`habit-${habit.id}`">
      <overview-column>
        <habit-title>{{ habit.title }}</habit-title>
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
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import styled from 'vue-styled-components'
import moment from 'moment'

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 8px;
`

const OverviewRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
  &:first-child {
    border-top: 1px solid #dfdfdf;
  }
`

const OverviewColumn = styled.div`
  display: flex;
  padding: 4px;
  flex: 1;
  border-right: 1px solid #dfdfdf;
  align-items: center;
  justify-content: center;
  &:first-child {
    flex 2;
    border-left: 1px solid #dfdfdf;
    justify-content: flex-start;
  }
`

const OverviewTitle = styled.h2`
  font-size: 14px;
`
const HabitTitle = styled.h2`
  font-size: 14px;
`

export default {
  name: 'Overview',
  components: {
    'overview': Overview,
    'overview-row': OverviewRow,
    'overview-column': OverviewColumn,
    'overview-title': OverviewTitle,
    'habit-title': HabitTitle,
  },
  computed: {
    ...mapState(['habits', 'habitHistories']),
    ...mapGetters(['isHabitMark']),
  },
  filters: {
    formatDayMounth(m) {
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
      DAYS_PER_WEEK: 7,
      FIVE_DAYS: 5,
    }
  },
}
</script>

<style lang="css" scoped></style>
