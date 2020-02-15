import { db } from '@/fb-config'

const settings = {
  // timestampsInSnapshots: true,
}
db.settings(settings)

const users = db.collection('users')
const habits = db.collection('habits')
const history = db.collection('history')

export { users, habits, history }
