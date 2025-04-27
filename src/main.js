import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initWebVitals } from './composables/webVitals'
import { useStats } from './composables/useStats'

const app = createApp(App)

app.use(router)

app.mount('#app')
initWebVitals()
useStats()
