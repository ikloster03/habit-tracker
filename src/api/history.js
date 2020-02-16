import { history } from '@/api/db'

export const fetch = ({ userId }) => {
  return history.where('userId', '==', userId).get()
}

export const create = ({ userId, data }) => {
  return history.add({
    userId,
    ...data,
  })
}

export const update = ({ historyId, data }) => {
  return history.doc(historyId).update({
    ...data,
  })
}

export const remove = ({ historyId }) => {
  return history.doc(historyId).delete()
}
