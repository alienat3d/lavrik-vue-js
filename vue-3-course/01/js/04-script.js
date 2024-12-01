const app = Vue.createApp({
	// Мы соединим firstName & lastName с вёрсткой.
	data() {
		return {
			firstName: '',
			lastName: '',
			showAlert: false
		}
	},
	computed: {
		fullName() {
			console.log(1);

			return (this.firstName + ' ' + this.lastName).trim();
		},
	},
	methods: {
		// Создадим метод, который будет конкатенировать имя и фамилию и их возвращать одной строкой.
		/* fullName() {
			console.log(1);

			return (this.firstName + ' ' + this.lastName).trim();
		}, */
		// 1.1 Тогда в принципе можно попробовать применить подобную подозрительную механику. Либо ещё иногда используют фильтры для этого, но вообще можно сделать так, какой-то метод toUppercase, который примет строку и эту строку как-то преобразует.
		// Go to [vue-3-course\01\04-methods-so-so.html]
		// ? На грани или за гранью философии Vue, однако к такому иногда прибегают.
		weirdMethod(str) {
			return str.toUpperCase().split('').reverse().join('')
		}
	}
})

const root = app.mount('.sample')
console.log(root);
