const app = Vue.createApp({
	data() {
		return {
			promo: '',
			price: 1000,
			sale: 0
		}
	},
	computed: {
		hasSale() {
			return this.sale > 0
		},
		total() {
			return this.price * (1 - this.sale / 100)
		}
	},
	// 5.3 А вместо этого откроем новый раздел "watch". И внутри него мы напишем функцию, которая называется так, как называется одно из полей в data или computed и идея в том, что как только значение одноимённого поля меняется, то срабатывает watcher. Т.е. теперь мы подпишемся на поле "promo" и сделаем вызов метода "getSale" для расчёта скидки по промокоду.
	watch: {
		promo() {
			this.getSale(this.promo, sale => {
				this.sale = sale
			});
		}
	},
	methods: {
		// 5.2 Также мы удалим "checkSale" и здесь.
		/* 		checkSale() {
					this.getSale(this.promo, sale => {
						console.log(sale);
		
						this.sale = sale
					});
				}, */
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