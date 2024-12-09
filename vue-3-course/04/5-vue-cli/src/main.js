// ? 1.0 "main.js" файл обязательный (если не хотим менять конфигурацию Webpack) и в нём мы будем подключать всё остальное для проекта.
import { createApp } from 'vue'
import App from './App.vue'

// ? 1.1 Во Vue обычно используют Vuetify, shadcn или Element+ библиотеки, созданные для работы со Vue, но чтобы не усложнять процесс обучения и показать работу со стилями установим Bootstrap.
// Go to [App.vue]
import 'bootstrap/dist/css/bootstrap.css'

createApp(App).mount('#app')