import { history } from '@/api/db'

export const fetch = ({ userId }) => {
  return history.where('userId', '==', userId).get()
}
