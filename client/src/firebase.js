import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDYCD0QAlLtayQvFEL2e-s1iD6fEuR5t6U',
  authDomain: 'ecommeres-8666c.firebaseapp.com',
  databaseURL: 'https://ecommeres-8666c.firebaseio.com',
  projectId: 'ecommeres-8666c',
  storageBucket: 'ecommeres-8666c.appspot.com',
  messagingSenderId: '502319789330',
  appId: '1:502319789330:web:99403c25fb852727ba2fcb',
  measurementId: 'G-VHC60VGCFS',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
