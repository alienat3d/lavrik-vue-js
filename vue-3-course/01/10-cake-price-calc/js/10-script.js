const app = Vue.createApp({
	// * 7.0 Рассмотрим пример из старого видео Дмитрия Лаврика (https://www.youtube.com/watch?v=8SeI7Vyfvcc), где создавался калькулятор цен на торты. Сперва мы занесём данные уже выбранных слоёв с их высотой в массив "layers", затем опишем виды слоёв в объекте с объектами "layerTypes", у нас будет свойство изначального стандартного слоя и также стандартной высоты.
	data() {
		return {
			layers: [
				{ type: 'biscuit', height: 10 },
				{ type: 'meringue', height: 5 },
			],
			layerTypes: {
				biscuit: {
					pricePerCm: 50,
					label: 'Бисквит'
				},
				meringue: {
					pricePerCm: 100,
					label: 'Безе'
				},
				curd: {
					pricePerCm: 75,
					label: 'Творожный'
				},
			},
			defaultLayer: 'biscuit',
			defaultHeight: 5,
		}
	},
	// 7.1 В "computed" опишем два свойства, проверку, что у нас есть хотя бы один выбранный слой. А также расчёт общей цены, исходя из выбранных слоёв и их толщины.
	computed: {
		hasLayers() {
			return this.layers.length > 0
		},
		price() {
			let sum = 0

			for (let index = 0; index < this.layers.length; index++) {
				const layer = this.layers[index]
				const layerType = this.layerTypes[layer.type]

				sum += layer.height * layerType.pricePerCm
			}

			return sum
		}
	},
	// 7.2 Нам также понадобятся метод "addLayer" для добавления нового слоя в торт. Нам нужно уметь менять высоту слоя, но нужен ли для этого слой, но нужен ли под это метод пока сложно сказать и нам нужно уметь удалять слой "removeLayer", который принимает "i", т.е. индекс конкретного слоя.
	// 7.3 Итак, в addLayer мы пушим значения поля по умолчанию, который будут появляться по кнопке "добавить ещё слой".
	// 7.4 В методе удаления слоёв используем splice(i, 1), это вырежет с индекса под номером i одну единицу.
	// 7.5 Ну, а высоту попробуем менять с помощью "v-model".
	methods: {
		addLayer() {
			this.layers.push({ type: this.defaultLayer, height: this.defaultHeight })
		},
		removeLayer(i) {
			this.layers.splice(i, 1)
		}
	}
})

const root = app.mount('.sample')