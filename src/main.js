import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { firebaseApp } from './Firebase/init'
// Import Firebase SDK

// Create Vue application
const app = createApp(App)

// Use PrimeVue and its theme
app.use(PrimeVue, { theme: { preset: Aura } })

// Use router
app.use(router)

// Mount the Vue application
app.mount('#app')
