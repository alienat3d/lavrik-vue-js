// ? Описание пользование API в файле 'api.txt'
// * 13.0 Что касается получения данных из корзины с сервера, то API корзины работает следующим образом: при запросе по адресу в "BASEURL" без передачи на него какой либо информации (токена), то мы получаем следующий ответ '{"cart":[],"token":"02d46c1a1c49ba703709474f866e52bb76acc7f7bd896589f1d5cbdbe1b36cd0","needUpdate":true}', где будет пустой массив, привязанный к уникальному токену этой корзины и флажок "needUpdate":true, что означает, что была создана новая корзина на сервере.
// 13.1 Теперь, если передать этот токен в URL: 'http://faceprog.ru/reactcourseapi/cart/load.php?token=02d46c1a1c49ba703709474f866e52bb76acc7f7bd896589f1d5cbdbe1b36cd0', то сервер ответит, что корзина найдена, т.е. флажок "needUpdate" в значении false. И получается так, что после первого обращения на серверное API нам нужно этот уникальный токен корзины где-то сохранить. И для этого отлично подходит localStorage.
// 13.2 Дальше у этого API есть разные методы, например "add.php", с передачей токена нужно также добавить и id товара и тогда он добавится в корзину: 'http://faceprog.ru/reactcourseapi/cart/add.php?token=02d46c1a1c49ba703709474f866e52bb76acc7f7bd896589f1d5cbdbe1b36cd0&id=101'
const BASEURL = 'http://faceprog.ru/reactcourseapi/cart/';

// ? 12.6.1 Если корзина, которую мы также получаем с сервера, загрузится чуть раньше, чем появятся товары, при том, если пользователь стартует сайт со страницы корзины, то у него могут в консоли быть ошибки. И если бы мы к полю title применили бы метод "trim()" или к price применяли метод "toFixed()", то это также вызвало бы ошибки. В этом заключается главная сложность асинхронного кода в SPA, что данные появляются в разное время и если мы эти моменты времени не согласуем, то полетят ошибки и может даже сломаться функционал.
/* ? 12.6.2 Так как с этим бороться? Обычно есть два пути и в реальных условиях берётся путь гибридный. 1-ый путь: признать данные критическими, т.е. сделав запрос на сервер заставить систему ждать, пока ответ не вернётся и только тогда отрисовывать приложение;
2-ой путь: loaders (в хранилище ставим маркеры).
*/
// Go to [vue-3-course\08\src\main.js]
export default {
	namespaced: true,
	// 13.9 Не забудем также добавить поле "token" в стейт равное пустоте.
	state: {
		items: [],
		token: null
	},
	getters: {
		inCart: state => id => state.items.some(item => item.id == id),
		itemsDetailed: (state, getters, rootState, rootGetters) => {
			return state.items.map(item => {
				let product = rootGetters['products/one'](item.id);
				return { ...product, cnt: item.cnt };
			})
		},
		length: state => state.items.length,
		total: (state, getters) => getters.itemsDetailed.reduce((t, i) => t + i.price * i.cnt, 0)
	},
	// 13.8 Также сделаем мутацию "load", которая примет стейт и объект с содержимым корзины и токеном и присвоит в стейт массиву "items" содержимое корзины, полученное с сервера и в token сам токен корзины. ↑
	mutations: {
		load(state, { cart, token }) {
			state.items = cart;
			state.token = token;
		},
		add(state, id) {
			state.items.push({ id, cnt: 1 });
		},
		remove(state, id) {
			state.items = state.items.filter(item => item.id != id);
		},
		setCnt(state, { id, cnt }) {
			let item = state.items.find(item => item.id == id);
			item.cnt = cnt;
		}
	},
	// 13.3 Также добавим экшен "load", который будет делать запрос на URL с тестовым API. И соответственно по аналогии с тем, как мы делали "load" в модуле "products.js" отправляем запрос на на сервер, но уже с другого URL.
	// 13.4 Вытащим деструктуризацией все поля "cart, token, needUpdate", чтобы их использовать.
	// 13.6 Также, чтобы с сервера получать уже выданную пользователем до этого корзину, то нужно также получать её токен с помощью метода "getItem" из localStorage в переменную "oldToken".
	// 13.7 И уже этот токен мы приклеиваем в fetch к URL-адресу после "load.php?token=" для обращения к конкретной корзине на сервере. ↑
	// 13.10 Дальше нужно сделать так, чтобы по клику на кнопки "Add", "Remove" & "Change Cnt" также делать запросы на сервер. Для "add" мы также добавим "async", прочтём описание API, где сказано, что нам нужно использовать "add.php", а также добавить токен корзины и id товара. Добавим стейт, где хранится токен и id. Также пропишем условие, что если ответ был с сервера получен (согласно описанию API это булево значение), то запускаем коммитом мутацию "add" и передаём ей id товара на добавление в корзину, а если сервер отклонил запрос, то не запускаем.
	// 13.11 Также по аналогии с "add" делает и "remove".
	// Go to [vue-2-intro\BonusSelfWrittenDirectives.html]
	actions: {
		async load({ commit }) {
			let oldToken = localStorage.getItem('CART__TOKEN');
			let response = await fetch(`${BASEURL}load.php?token=${oldToken}`);
			let { cart, token, needUpdate } = await response.json();

			// 13.5 Если в ответе было, что needUpdate — true, то мы сохраняем в localStorage полученный с сервера токен.
			if (needUpdate) {
				localStorage.setItem('CART__TOKEN', token);
			}

			commit('load', { cart, token });
		},
		async add({ commit, getters, state }, id) {
			if (!getters.inCart(id)) {
				let response = await fetch(`${BASEURL}add.php?token=${state.token}&id=${id}`);
				let res = await response.json();

				if (res) {
					commit('add', id);
				}
			}
		},
		async remove({ commit, getters, state }, id) {
			if (getters.inCart(id)) {
				let response = await fetch(`${BASEURL}remove.php?token=${state.token}&id=${id}`);
				let res = await response.json();

				if (res) {
					commit('remove', id);
				}
			}
		},
		setCnt({ commit, getters }, { id, cnt }) {
			if (getters.inCart(id)) {
				let item = getters.itemsDetailed.find(item => item.id == id);
				let validCnt = Math.min(Math.max(cnt, 1), item.rest);
				commit('setCnt', { id, cnt: validCnt });
			}
		}
	}
}
