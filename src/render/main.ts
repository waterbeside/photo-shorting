import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/antd.css'
import './assets/style/index.scss'
import 'vite-plugin-svg-icons/register'

const app = createApp(App)
// app.config.productionTip = false
app.use(router).mount('#app')
