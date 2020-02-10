<template>
  <overview>
    <overview-row v-for="habit in habits" :key="`habit-${habit.id}`">
      <overview-column>
        <habit-title>{{ habit.title }}</habit-title>
      </overview-column>
      <overview-column v-for="col in 7" :key="`habit-col-${col}`">
        {{ col }}
      </overview-column>
    </overview-row>
  </overview>
</template>

<script>
import { mapState } from 'vuex'
import styled from 'vue-styled-components'

const Overview = styled.div`
  display: flex;
  flex-direction: column;
`

const OverviewRow = styled.div`
  display: flex;
  flex-direction: row;
`

const OverviewColumn = styled.div`
  display: flex;
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
    'habit-title': HabitTitle,
  },
  computed: {
    ...mapState(['habits', 'habitHistories']),
  },
}
</script>

<style lang="css" scoped></style>
