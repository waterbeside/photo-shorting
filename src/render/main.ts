import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/index.scss'

const app = createApp(App)
// app.config.productionTip = false
app.use(router).mount('#app')
