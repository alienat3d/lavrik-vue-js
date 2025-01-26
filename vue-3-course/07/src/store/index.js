// * 6.0 Сперва мы раздробим хранилище на модули, потому, что так будет просто проще писать и понимать код в дальнейшем. Нам нужно разделить его на 3 отдельные по своему смыслу секции: товары, корзина и index, который будет их собирать воедино.
// ? 6.1.0 Что такое «модульное хранилище»? Пока у нас было одно хранилище, где мы описывали товары, корзину, геттеры, мутации, экшены под них. И вроде в начале кажется, что это займет не так уж много строк кода. Но, по мере усложнения системы, кода будет становиться ощутимо больше. Потому, что для корзины потребуется добавление, удаление, изменение кол-ва товаров, для товаров - получать товар по айди, а когда появится серверная сторона, то также при изменения состояния корзины делать запрос на сервер, чтобы это на сервере сохранить. Также нужно будет товары и стартовое состояние корзины с сервера загружать. При оформлении заказа данные спрашивать данные пользователя, а корзину очищать. И это всё вместе выйдет не в 40 строк кода, а несколько сотен легко. Поэтому лучше сразу продумать разделение кода на логические части, чтобы был отдельный модуль хранилища каталога, корзины, данных о клиенте для заказа.
// ? 6.1.1 И вот с такой системой модульного хранилища мы сможем в каждом модуле написать независимый друг от друга код, а также файлы будут разумного размера и более читаемые, а также будет исключён возможный конфликт имён.
// 6.2 Во Vuex это делается так: создаётся папка store и в нём будет корневой и главный файл хранилища index.js (этот). А также создадим модули для корзины "cart.js" и для товаров "products.js".
// Go to [vue-3-course\07\src\store\products.js]
import { createStore } from 'vuex'

// 6.4 Собственно сам импорт модулей хранилища и их мы также добавляем в объект "modules" в объекте store.
import products from './products'
import cart from './cart'

const store = {
	modules: {
		products,
		cart
	},
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);

// 6.5 И вот если раньше, когда у нас было одно хранилище мы писали $store.state.cnt, а теперь, когда у нас модульное хранилище, то мы получаем доступ ко всем товарам или ко всему содержимому корзины так:
/* $store.state.products.all
$store.state.cart.all */

// 6.6.0 Но вот с геттерами другой случай, их система по вложенным ключам не кладёт.
// Go to [vue-3-course\07\src\store\products.js]
// 6.6.2 И теперь при генерации геттеров, мутаций и экшенов для них будут созданы автоматически префиксы. И теперь, когда мы захотим обратиться к геттеру товара или корзины, то действуют следующие правила именования.
// 6.6.3 Если не нравится вариант записи через "/", то это легко исправляется функцией mapGetters, в которой первым параметром указывается имя модуля, откуда берутся данные, а вторым параметром будет список полей, которые нам нужны.
/*
$store.getters.all

$store.getters['products/all']
$store.getters['cart/all']
*/
// Go to [vue-3-course\07\src\store\products.js]