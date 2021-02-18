import { createApp } from 'vue';
// const { ipcRenderer } = require('electron')
import App from './App.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/style/index.scss';

// console.log('ipcRenderer:', ipcRenderer)

const app = createApp(App);
// app.config.productionTip = false;
app.use(Antd);
app.mount('#app');
