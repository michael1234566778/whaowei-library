import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getFirestore } from 'firebase/firestore'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import Firebase SDK
import { initializeApp } from 'firebase/app'

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

// Create Vue application
const app = createApp(App)

// Use PrimeVue and its theme
app.use(PrimeVue, { theme: { preset: Aura } })

// Use router
app.use(router)

// Mount the Vue application
app.mount('#app')

// Now you can use `firebaseApp` in your application, or export it for other modules
export { firebaseApp }
