/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// import './styles/main.scss'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Plugins
import { registerPlugins } from '@/plugins'

const pinia=createPinia()
const app = createApp(App)
app.use(pinia)
registerPlugins(app)

app.mount('#app')
