import { createApp } from 'vue'
import App from './App.vue'
console.log('App', window.parent)
createApp(App).mount('#app')
