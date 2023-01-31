import '@/styles/reset.css'
import '@/styles/variables.css'
import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'

import { registerStore } from '@/store'

import App from './App.vue'
import { router, setupRouter } from './router'

const app = createApp(App)
app.use(router)
registerStore(app)
setupRouter()
app.mount('#app')
