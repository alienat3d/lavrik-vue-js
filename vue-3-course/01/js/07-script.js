const app = Vue.createApp({
	// 4.4 Также мы задаём в data поле "sale".
	// Go to [vue-3-course\01\07-computed-async.html]
	data() {
		return {
			promo: '',
			price: 1000,
			sale: 0
		}
	},
	// 4.1 Потому, что бесполезно в computed пытаться рассчитать скидку и её вернуть, потому, что нам нужно вернуть значение прямо сейчас. И если мы возвращаем метод getSale, который задержится хотя бы на 1 мс, т.е. совершит асинхронную работу, то система вернут некорректное значение, она не будет дожидаться момента получения данных от асинхронной функции.
	// ? 4.2 Это приводит к выводу, что поля computed могут только в синхронном режиме существовать.
	// 4.3 И что же делать в этом случае? Мы отказываемся от этого computed поля, которое связанно с асинхронной функцией. Заметим, что не от всех полей, а только от конкретного, связанного с асинхронностью непосредственно. Итак поле "sale" мы здесь убираем.
	computed: {
		/* 		sale() {
					return this.getSale(this.promo)
				}, */
		hasSale() {
			return this.sale > 0
		},
		total() {
			return this.price * (1 - this.sale / 100)
		}
	},
	// * 4.0 Однако, бывают случаи, когда computed поля бессильны, они не так часты, но тем не менее. Допустим getSale становится асинхронной функцией, например она отсылает запрос на сервер, чтобы получить имеющиеся в системе промокоды. Мы пока можем симулировать асинхронность с помощью setTimeout. Если функция асинхронная, то у неё есть 2 способа сообщить о результате своей работы: коллбэк и промис. Но мы столкнёмся с тем, что такой подход не сработает. Почему?
	// 4.6 Также создадим и здесь эту функцию "checkSale", в неё запишем getSale, в который передаём собственно промокод и функцию обработчик. Здесь может быть довольно сложный момент, который не связан со Vue. Ошибок в консоли нет, но код не работает. Как нам действовать в таком случае?
	methods: {
		checkSale() {
			// 4.10 Поправить мы это можем с помощью стрелочной функции. Ей мы закрепляем контекст, оставляя его таким, каким он был в месте, где мы эту функцию объявили.
			// Go to [vue-3-course\01\08-watch.html]
			this.getSale(this.promo, sale => {
				// 4.7 Первым делом посмотрим рассчитывается ли скидка и увидим, что да. Значит дело в строчке ниже.
				// Go to [vue-3-course\01\07-computed-async.html]
				// 4.9 Да, проблемой является контекст вызова. Дело в том, что мы наш коллбэк передали в setTimeout, а там коллбэк это глобальный объект Window. 
				console.log(sale);

				this.sale = sale
			});
		},
		getSale(promo, fn) {
			setTimeout(() => {
				const codes = {
					cheapskate: 5,
					lucky10: 10,
					super20: 20,
					winterholidays: 25
				}

				const sale = codes.hasOwnProperty(promo) ? codes[promo] : 0

				fn(sale)
			}, 500);
		}
	}
})

const root = app.mount('.sample')