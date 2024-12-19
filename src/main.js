import '@/assets/scss/style.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import main from './App.vue'
import router from './router/index.js'

const app = createApp(main);
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
