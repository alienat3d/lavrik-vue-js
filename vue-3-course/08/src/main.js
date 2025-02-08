// Go to [vue-3-course\08\src\store\products.js]
import { createApp } from "vue";
import App from './App';
import store from './store';
import router from './router'

// ? 12.6.3 Можно дописать чейнинг "then" (тоже самое, что await, работа с промисами, но другая лаконичная запись) и уже в нём рендерить приложение. Теперь загрузка приложения будет чуточку дольше, но все ошибки пропадут. Также можно добавить во время загрузки какой-нибудь лоадер, который сигнализирует пользователю, что нужно немного подождать. Минус такого подхода очевиден — мы заставляем пользователя дольше ждать загрузки сайта. Хотя ведь он мог бы заходить на страницу, где загрузка этих товаров не нужна. Хотя так легче программировать, ведь можно об этой проблеме тогда не думать
// Go to [vue-3-course\08\src\store\products.js]
store.dispatch('products/load').then(() => {
	createApp(App)
		.use(store)
		.use(router)
		.mount('#app');
});

// 12.2 Если мы запустим методом dispatch экшен "load", то увидим данные принятые с сервера.
// Go to [vue-3-course\08\src\store\products.js]
store.dispatch('cart/load');

import 'bootstrap/dist/css/bootstrap.min.css'