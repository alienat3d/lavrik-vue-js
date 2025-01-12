import { createApp } from "vue";
import App from './App';

import { createVfm } from 'vue-final-modal'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle);
library.add(faExclamationCircle);

const vfm = createVfm();

createApp(App).component('fa-icon', FontAwesomeIcon).mount('#app');

App.use(vfm).mount('#app');

import 'bootstrap/dist/css/bootstrap.min.css'