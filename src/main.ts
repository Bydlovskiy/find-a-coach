import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/MainStore'
import './assets/tailwind.css'
// import BaseDialog from './components/layouts/BaseDialog.vue'


const app = createApp(App)
// app.component('base-dialog' , BaseDialog)

app.use(store)
app.use(router)
app.mount('#app')
