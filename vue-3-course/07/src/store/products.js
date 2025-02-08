// 6.3 Здесь у нас будет экспортироваться описательный объект для товаров. И его мы импортируем в корневой файл хранилища "index.js".
// Go to [vue-3-course\07\src\store\index.js]
// 6.6.1 Но Vue предоставляет нам удобный инструмент для этого, который называется "namespaced: true".
// Go to [vue-3-course\07\src\store\index.js]
// * 9.0 Начинаем решать ДЗ, сперва из [vue-3-course\07\src\store\cart.js] позаимствуем гетте "inCart" и чуточку его видоизменим, теперь нам нужен метод "find", который будет искать товар по его id.
// Go to [vue-3-course\07\src\components\Product.vue]
export default {
	namespaced: true,
	state: {
		items: stub()
	},
	getters: {
		all: state => state.items,
		one: state => id => state.items.find(item => item.id === id),
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
		{ "id": 100, "title": "Motorola Moto G Power", "price": 290, "rest": 10, "pic": "motorola-moto-g-power-2025.jpg" },
		{ "id": 101, "title": "ZTE Blade V70 Max", "price": 220, "rest": 20, "pic": "zte-blade-v70-max.jpg" },
		{ "id": 102, "title": "Asus ROG Phone 9 FE", "price": 860, "rest": 5, "pic": "asus-rog-phone-9-fe.jpg" },
		{ "id": 103, "title": "Motorola Moto G15", "price": 335, "rest": 12, "pic": "mototola-moto-g15.jpg" },
		{ "id": 104, "title": "Ulefone Armor 28 Ultra Thermal", "price": 1400, "rest": 2, "pic": "ulefone-armor-28-ultra.jpg" },
		{ "id": 105, "title": "Sharp Aquos R9 pro", "price": 770, "rest": 7, "pic": "sharp-aquos-r9-pro.jpg" },
		{ "id": 106, "title": "Motorola Moto G15 Power", "price": 410, "rest": 15, "pic": "mototola-g15-r.jpg" },
		{ "id": 107, "title": "ZTE nubia Flip2", "price": 345, "rest": 9, "pic": "zte-nubia-flip2.jpg" },
		{ "id": 108, "title": "Motorola Moto E15", "price": 280, "rest": 20, "pic": "mototola-moto-e15.jpg" },
		{ "id": 109, "title": "HMD Key", "price": 70, "rest": 55, "pic": "hmd-key.jpg" },
		{ "id": 110, "title": "Energizer Ultimate U6G", "price": 140, "rest": 49, "pic": "energizer-u6g.jpg" },
	];
}