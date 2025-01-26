// 6.3 Здесь у нас будет экспортироваться описательный объект для товаров. И его мы импортируем в корневой файл хранилища "index.js".
// Go to [vue-3-course\07\src\store\index.js]
// 6.6.1 Но Vue предоставляет нам удобный инструмент для этого, который называется "namespaced: true".
// Go to [vue-3-course\07\src\store\index.js]
export default {
	namespaced: true,
	state: {
		items: stub()
	},
	getters: {
		all: state => state.items
	},
	mutations: {

	},
	actions: {

	}
}

// 6.7 Представим, что сервер нам передал следующие данные. Их мы положим в специальную функцию-заглушку, которая будет нам их возвращать.
// Go to [vue-3-course\07\src\components\ProductsList.vue]
function stub() {
	return [
		{ "id": 100, "title": "Ipnone 200", "price": 12000, "rest": 10 },
		{ "id": 101, "title": "Samsung AAZ8", "price": 22000, "rest": 5 },
		{ "id": 103, "title": "Nokia 3310", "price": 5000, "rest": 2 },
		{ "id": 105, "title": "Huawei ZZ", "price": 15000, "rest": 8 }
	];
}