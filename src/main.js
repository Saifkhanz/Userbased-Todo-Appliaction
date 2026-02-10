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
import i18n from './i18n'

const pinia=createPinia()
const app = createApp(App)
app.use(pinia)
app.use(i18n)
registerPlugins(app)

app.mount('#app')
