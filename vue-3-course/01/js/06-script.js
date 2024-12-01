const app = Vue.createApp({
	data() {
		// Укажем промокод и базовую цену товара
		return {
			promo: '',
			price: 1000
		}
	},
	// 3.5 Нам также понадобится computed, чтобы исходя из изначальной цены и скидки определить итоговую цену. Где в переменную мы поместим размер скидки, а возвращать уже будем цену за вычетом скидки.
	// 3.6 И вот почему полезно сегментировать computed — мы никогда не знаем, может нам потом скажут, что хорошо бы как-то обозначать, что у покупателя активировалась скидка визуально специальным зелёным блоком, а изначальную цену оставлять, чтобы он видел, что применилась скидка и сколько денег он с ней сэкономил. Для этого полезно данные делить на более мелкие кусочки. И наш total мы могли бы тоже разделить на 3 куска с разной информацией: наличие скидки, её размер и итоговая цена (хотя наличие скидки может и не так актуально выносить, можно и в шаблоне сделать ветвление с проверкой, но её размер точно). И на первый взгляд может показаться, что мы раздули код аж на 6 строчек, но на самом деле это даёт нам большую гибкость в будущем.
	// 3.8 А ещё мы можем заметить, что computed поля зависят не только от данных в data, но и друг от друга и это работает каскадно: когда меняется значение promo срабатывает поле computed "sale", которое зависит от promo, а когда сработает "sale", то сработают и "hasSale" вместе с "total", зависящие от "sale".
	// Go to [vue-3-course\01\06-computed-sale.html]
	computed: {
		sale() {
			return this.getSale(this.promo)
		},
		hasSale() {
			return this.sale > 0
		},
		total() {
			return this.price * (1 - this.sale / 100)
		}
	},
	methods: {
		// 3.4 Добавим метод с промокодами и проверкой тернарником есть ли такой код и какая у него скидка
		getSale(promo) {
			const codes = {
				cheapskate: 5,
				lucky10: 10,
				super20: 20,
				winterholidays: 25
			}

			return codes.hasOwnProperty(promo) ? codes[promo] : 0
		}
	}
})

const root = app.mount('.sample')