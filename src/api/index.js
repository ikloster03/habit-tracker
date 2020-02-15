import * as habits from '@/api/habits'
import * as history from '@/api/history'

export const getHistory = ({ userId }) => {
  return history.where('userId', '==', userId).get()
}

export { habits, history }
