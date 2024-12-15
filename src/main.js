import '@/assets/scss/style.scss'

import { createApp } from 'vue'
import main from './App.vue'
import router from './router/index.js'

const app = createApp(main)

app.use(router)

app.mount('#app')
