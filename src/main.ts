import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/MainStore'
import './assets/tailwind.css'
import 'element-plus/es/components/notification/style/css'

const app = createApp(App)

app.use(store)

app.use(router)

app.mount('#app')
