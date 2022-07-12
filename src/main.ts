import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import './index.css'

const app = createApp(App)

app.component('date-picker', Datepicker)
app.use(router).mount('#app')
