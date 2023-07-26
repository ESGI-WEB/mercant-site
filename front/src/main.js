import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import checkoutPlugin from './plugins/checkout'

const app = createApp(App)

app.use(router)
app.use(checkoutPlugin)

app.mount('#app')
