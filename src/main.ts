import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './store'

async function bootStrap() {
  const app = createApp(App)
  setupStore(app)
  app.use(router).mount('#app')
}
bootStrap()