import { createApp } from "vue";
import App from './App';
// 3.1 Здесь мы тоже должны импортировать хранилище store.
import store from './store';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle);
library.add(faExclamationCircle);

// 3.2 И в createApp мы его передадим командой "use".
// Go to [vue-3-course\06\src\store.js]
createApp(App)
	.use(store)
	.component('fa-icon', FontAwesomeIcon)
	.mount('#app');

import 'bootstrap/dist/css/bootstrap.min.css'