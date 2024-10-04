import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBGq7gwVBxCDenW-Ra_PW6jnEP-w5MtjZQ',
  authDomain: 'week7-haowei.firebaseapp.com',
  projectId: 'week7-haowei',
  storageBucket: 'week7-haowei.appspot.com',
  messagingSenderId: '908123873844',
  appId: '1:908123873844:web:f20dca43e8592bfef66061'
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

// Now you can use `firebaseApp` in your application, or export it for other modules
export { firebaseApp }
export default db
