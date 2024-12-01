const app = Vue.createApp({
	// * 6.0 Директива "v-for" множит через цикл какие-то элементы на странице. И вот представим, что у нас есть некий массив чисел.
	// Go to [vue-3-course\01\09-v-for.html]
	data() {
		return {
			numbers: []
			// letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
		}
	},
	// 6.5 Создадим метод добавление случайного числа из диапазона от 1 до 100.
	methods: {
		addNumber() {
			this.numbers.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
		},
		// 6.6 А также метод, который будет удваивать число.
		// Go to [vue-3-course\01\09-v-for.html]
		double(i) {
			this.numbers[i] *= 2
		}
	}
})

const root = app.mount('.sample')