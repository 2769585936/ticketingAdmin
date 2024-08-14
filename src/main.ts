import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@/styles/themeColor.scss'
import '@/styles/initStyle.scss'
import '@/styles/transition.scss'
import '@/styles/iconfont/iconfont.css'

import '@/permission.ts'
import router from '@/router/index'

import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia)
app.mount('#app')

console.log(import.meta.env)
