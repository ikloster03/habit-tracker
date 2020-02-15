import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN_URL,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

export { db, auth, currentUser }
