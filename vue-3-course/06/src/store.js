import { createStore } from 'vuex'

/*
	const ORDER_STATUSES = {
		new: 0,
		pending: 1,
		done: 2
	}
*/

// * 3.0 Итак, после того, как мы импортировали метод "createStore" мы создадим собственно описательный объект хранилища "store", в котором есть собственно стейт с данными, мутации, а также ещё геттеры и сеттеры.
// Go to [vue-3-course\06\src\main.js]
// 3.3 В стейт добавим цену "price" и счётчик товаров "cnt" (от "count").
// Go to [vue-3-course\06\src\components\Product.vue]
// ? Важно помнить, что Vuex вообще не работает с контекстом. Во Vue-компоненте мы с помощью "this" получаем доступ, например из метода к data "this.поле-из-data", как и в computed-поле компонента, чтобы посчитать какие-то данные мы обратимся с помощью "this.поле-из-data". А в хранилище Vuex система отличается и передаёт, с помощью описанной на примере в самом низу схемы, строго ограниченное кол-во данных и уже в геттере мы мутацию не получим. А в компоненте это возможно из computed-поля получить метод (хотя этого и не нужно делать, т.к. это плохо). А в геттере Vuex ни к чему другому, кроме state и к другим геттерам доступа просто нет.

// 3.8.1 Представим, что есть неких "orderStatus" и это просто константа с каким-то значением и вот компонент получит его значение, а он не знает для чего это значение ему нужно. ↓
const store = {
	state: {
		price: 1000,
		cnt: 1,
		orderStatus: 0
	},
	// 3.7.1 И вот здесь появляется раздел "getters", который по сути содержит computed-поля для хранилища. Но, в отличии от базовых computed-полей, они не работают с контекстом вообще. Они принимают параметры state, getters (также outState, outGetters?), но пока рассмотрим на примере state.
	// 3.7.2 Например мы сделаем геттер "total", что будет явл. функцией, которая по умолчанию принимает state (по аналогии с вызовом мутации). И вот сюда мы и запишем наше выражение умножения цены на кол-во для вычисления общей суммы цены всех товаров.
	// ? 3.8.0 Стоит ещё упомянуть о связи компонентов и хранилища. Есть разные взгляды на то, сколько геттеров должно быть, т.е. те данные, которые рассчитываются "на лету" они однозначно записываются в геттеры, но есть ещё такая практика вокруг тех частей стейта, которые компоненты могут читать, ставить обёртки для геттеров. С одной стороны есть небольшой минус в том, что обёртки геттеров увеличивают кол-во написанных строк, но также плюс заключается в том, что мы заявляем жёсткие правила для компонентов и говорим Vuex, что state это приватная часть хранилища и компоненты не имеют права лезть в state. А геттеры это публичная часть хранилища, которую компоненты могут использовать. И мы делаем геттеры такими — отдаём всё, что нужно компонентам может быть и только это. ↑
	// 3.8.2 И вот под это дело мы можем сделать наглядные геттеры, например "orderIsNothing", "orderIsPending" и "orderIsDone". И прописываем им всем соответствующие значения. И теперь у нас есть внятные статусы. И философия здесь такая, что state компонентам вообще не должен быть доступен, а получают они только геттеры.
	// ? 3.8.3 Также бывает, что перестраивается структура данных, например у нас был массив товаров, а мы сделали из него объект товаров и в геттере мы сможем его обратно в массив превратить. При этом нельзя сказать, что именно этот подход правильный, каждый разработчик (или компания) решает для себя какой подход больше подходит. Д. Лаврик выбирает для себя подход с обёртками геттеров, т.к. считает его более безопасным.
	// Go to [vue-3-course\06\src\components\Product.vue]
	getters: {
		price: state => state.price,
		cnt: state => state.cnt,
		total: state => state.price * state.cnt,
		orderIsNothing: state => state.orderStatus == 0, // Наверное можно было придумать более подходящее английское слово :-)
		orderIsPending: state => state.orderStatus == 1,
		orderIsDone: state => state.orderStatus == 2
	},
	// 3.6.1 Что может вначале несколько обескураживать, так это то, что здесь мы в мутации передаём переменную state, которая является ссылкой на стейт хранилища и т.о. мы можем делать любые изменения с содержимым этого state. И для лучшего понимания того как срабатывают мутации и почему в них передают state рассмотрим на примере.
	// Go to [vue-3-course\06\src\components\Product.vue]
	// 3.6.5 Мутации полностью контролируют состояние хранилища и с помощью проверок нужно стараться избегать каких-то заведомо неправильных ситуаций, например, в мутации "decrease", уменьшающей состояние кол-ва товаров оно не должно уходить в минусовые значения и т.д. 
	// Go to [vue-3-course\06\src\components\Cart.vue]
	// 5.9.0 А пока мы рассмотри экшен, в котором наглядно видно зачем он нужен. Вот у нас есть мутация "setOrderStatus", которая примет state & status. ... ↓
	// ? 5.10.1 И всё же почему мутация вынесена в отдельную секцию? Потому, что в мутации может идти несколько присваиваний друг за другом (см. пример в комменте). Например, здесь одна мутация меняет значение нескольких полей. Представим, что пользователь авторизовался и мы меняем ему в хранилище логин, id и т.д. И если мы считаем, что во Vue работает либо прокси, либо гет\сет система, как во Vue 2. То в момент присваивания поля сработает ловушка-перехватчик, которая запустит ререндеринг компонентов. И в конкретном случае запустится рендеринг аж трижды (а могло бы быть и больше). Это настоящий resources leak. И потому мутация ставит перед своим запуском флажок блокировки системы ререндеринга. И тогда когда все присваивания проходят, то в конце функции этот флажок снимает. Именно это ставит на мутацию ограничения, чтобы она была синхронной маленькой функцией.
	/* Go to [vue-3-course\06\src\components\Product.vue] */
	/* 	mutations: {
			loggedUser(state) {
				state.a = 1
				state.b = 2
				state.c = 3
			}
		}, */
	// ? 6.0 Итак, мы помним, что мутации это маленькие синхронные функции, единственная задача которых — изменение стейта. А экшены могут быть асинхронными и в них можно делать всё что угодно: запускать несколько мутаций, побочные эффекты совершать, а также асинхронный код, включая запросы на сервер. Именно по этой причине мутации даже небольшие оборачивают в экшены и именно поэтому мутации не вызывают из компонентов. Представим, что мы бы сделали так вот наивно "setCnt" как синхронное действие, а в будущем выясняется, что даже при смене товаров в корзине всё равно идёт запрос на сервер, который на сервере запишет реальное кол-во товаров в БД и получается, что компонент, который ранее вызывал мутацию больше не может оставаться в таком виде — его придётся переписать, т.к. такую мутацию придётся обернуть в экшен, потому, что асинхронный код иначе не напишешь. И чтобы на такие ситуации не нарываться, где при внедрения асинхронного кода, нам не приходилось менять код всего компонента — создаётся обёртка экшена над мутацией.
	// 6.1 Поэтому в ДЗ тут нам требуется сделать обёртки над мутациями, чтобы компоненты вызывали экшены.
	// ? 6.2 Важно понимать, что мутаций не должно быть столько же, сколько экшенов. Вот, например, один экшен "makeOrder" по очереди вызывает мутации "sendOrder" и "doneOrder".
	// ? 6.3 Тоже самое нужно сделать и для increase/decrease мутаций, но используя чуточку другой приём: если подумать про изменение кол-ва товара, то компоненты могут вызывать три разных действия — получается экшена 3. Но вычисление допустимого кол-ва это одна мутация, т.к. нам нужно проверить правильное ли число к нам пришло, не оказалось ли оно меньше 0. И тут нам нужно сделать 3 экшена, которые будут вызываться из компонента Product и придумать под них одну универсальную мутацию, которая будет называться, например, setCnt. А increase и decrease эту мутацию вызывают и она в себе делает все необходимые действия: осуществляет валидацию и записывает правильное cnt в это поле.
	// ? 7.0 Честно говоря даже 3 экшена на практике-то и не нужны: increase/decrease это мелкие локальные действия, в которых нет особой ценности. Проще сделать один экшен и одну мутацию, которые будут называться setCnt и когда мы хотим сделать клик по кнопкам "+1" или "-1" мы в этот компонент притянем геттером cnt и вызовем единственный экшен setCnt к cnt прибавляя или вычитая единицу. Такие мелкие экшены типа инкремента или декремента только усложняют использование хранилища и без них можно вполне обойтись. Но раз уж было дано такое задание сделать 3 экшена и 1 мутацию, то поехали...
	// 7.1 Начнём с того, что мутация должна быть какой-то универсальной и это будет "setCnt". ↓
	mutations: {
		decrease(state) {
			if (state.cnt > 1) {
				state.cnt--
			}
		},
		increase(state) {
			state.cnt++
		},
		setCnt(state, val) {
			state.cnt = Math.max(1, val);
		},
		setOrderStatus(state, status) {
			state.orderStatus = status;
		},
	},
	// ? 5.6 И вот что от нас хочет Vuex, чтобы были сделаны некие экшены, которые вначале могут показаться нелепым копипастом, но на самом деле это не лишняя обёртка. Потому, что мы изначально проектировали так, что было сделано только две мутации. Но если бы мы проектировали этот код иначе, то на старте мы бы отталкивались именно от экшенов. И в таком случае мы бы мутации могли планировать иначе. Мы бы не делали их две, а сделали бы просто одну мутацию установки произвольного кол-ва товаров. А экшены как раз были бы удобны для компонентов (increase, decrease, setCnt, например).
	// 5.7 Сделаем для примера экшен decrease, который примет параметром store и в нём укажем store.commit с названием мутации. И так мы сделали в компоненте dispatch action. Можно было бы и так оставить, но лучше переделать, т.к. ни понимания ни энтузиазма это не вызывает. Когда у нас поверх двух мутаций становится два аналогичных экшена, это выглядит излишеством.
	// * 5.8 И вот одним из пунктов ДЗ является отрефакторить систему экшенов и мутаций — сделать 3 экшена и 1 мутацию. ↑
	/* 	actions: {
			decrease(store) {
				store.commit('decrease')
			}
		}, */
	// 5.9.1 Но экшен же не будешь называть "setOrderStatus", ведь когда человек наживает отправить заказ, то логичнее будет экшен назвать "send". И этот экшен является гораздо более общим действием, чем setOrderStatus. Он, во-первых, вызывает store.commit() с параметром 'setOrderStatus' и передавать вторым параметром статус 1, например. Для удобства лучше для статусов добавить отдельную константу с перечислением в самом верху кода. ↑
	// 5.9.2 Далее у нас идёт запрос на сервер с отправкой этого заказа (эмуляция с помощью setTimeout). И потом мы передаём в store, что статус меняется на 2, т.е. "done".
	// ? 5.10.0 И вот тут мы видим, что экшен это не какая-то копипаст, а это физическое действие, которое запускает человек (в данном случае отправка формы на сервер). Отправка формы, в плане работы с мутациями, это дело составное. Мы сперва ставим статус, что отправка идёт, чтобы заблокировать кнопку и показать gif-ку loader. А затем, когда сервер ответит, мы ставим, что либо заказ успешно завершён, либо неуспешно. А мутация занимается другим — это внутренняя часть store и компонент с этой мутацией не связан. Итак, мутация это изменение данных в store, небольшое, конкретное, локальное. А экшен — асинхронное и часто более сложное действие из нескольких шагов. ↑
	// 7.2 Ну, а также у нас будет 3 экшена, такие же как были раньше мутации, которые принимают store целиком.
	// ? 7.3 У store есть "commit" для запуска мутаций, "dispatch" для запуска экшенов, а также доступ к геттерам, к стейтам и ко всему, что может быть ещё нужно.
	// 7.4 Далее мы запускаем в экшене "decrease" мутацию setCnt с параметром stateCnt - 1. Для "increase" будет параметр соответственно + 1. Валидации в экшенах не предусмотрено, т.к. этим уже заведует мутация, отвечая за целостность данных.
	// 7.5 Также у нас добавляется экшен "setCnt", который отвечает за установку произвольное кол-во и принимает он помимо commit & state также новое значение "value", которое может быть строковым. И вот здесь уже делаем микро-проверки. Значение должно быть целым числом, т.к. это кол-во товара. Также проверим, что cnt может быть NaN. А также cnt минимальное берём 1.
	// 7.6 Дальше мы смотрим, что если cnt распарсить не удалось, то тогда подставляем единицу, иначе ставим значение cnt.
	// Go to [vue-3-course\06\src\components\Product.vue]
	actions: {
		// Может быть написан с применением деструктуризации. Полезно, чтобы сразу указать какими инструментами мы тут собираемся пользоваться.
		// Тоже самое, что и:
		/* decrease(store) {
			const { commit, state } = store
			const commit = store.commit
			const state = store.state
		} */
		decrease({ commit, state }) {
			commit('setCnt', state.cnt - 1)
		},
		increase({ commit, state }) {
			commit('setCnt', state.cnt + 1)
		},
		setCnt({ commit }, value) {
			const cnt = parseInt(value)
			commit('setCnt', isNaN(cnt) ? 1 : cnt)
		},
		send(store) {
			store.commit('setOrderStatus', 1);

			// request to server
			setTimeout(() => {
				store.commit('setOrderStatus', 2);
			}, 500);
		}
	},
	// ? Такая запись рекомендована, чтобы перевести Vuex в строгий режим для режимов разработки.
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);

// 3.6.3 ..., то происходит примерно следующее (рассмотрим на пародийном примере JS класса): Vuex из себя представляет примерно такую конструкцию: у него есть объект state (состояние), mutations (мутации), а также есть метод commit, который принимает названия мутаций. И этот метод commit достаёт мутацию из этого поля по имени, а затем эту найденную функцию вызывает, передавая туда состояние.
// Go to [vue-3-course\06\src\components\Product.vue]
/*
	class VuexParody{
		state = {}
		mutations = {}

		commit(name){
			let fn = this.mutations[name]
			fn(this.state);
		}
	}

*/