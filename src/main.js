import '@/assets/scss/style.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import main from './App.vue'
import router from './router/index.js'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


const app = createApp(main);
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right'
})
app.mount('#app')
