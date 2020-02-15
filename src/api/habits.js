import { habits } from '@/api/db'

export const fetch = ({ userId }) => {
  return habits.where('userId', '==', userId).get()
}

export const create = ({ userId, data }) => {
  return habits.add({
    userId,
    ...data,
  })
}

export const update = ({ userId, habitId, data }) => {
  return habits.doc(habitId).set({
    userId,
    ...data,
  })
}

export const remove = ({ habitId }) => {
  return habits.doc(habitId).delete()
}
