import { createApp } from 'vue'
import App from './App.vue'
import vm from 'virtual-module'

console.log('virtual module:', vm);

createApp(App).mount('#app')
