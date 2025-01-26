// 1.1 Здесь мы как обычно по документации добавим router, а дальше подключим его к App с помощью "use".
// Go to [vue-3-course\07\src\router.js]
import { createApp } from "vue";
import App from './App';
import store from './store';
import router from './router'

createApp(App)
	.use(store)
	.use(router)
	.mount('#app');

import 'bootstrap/dist/css/bootstrap.min.css'