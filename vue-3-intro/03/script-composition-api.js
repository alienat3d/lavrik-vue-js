// * 2.0 А теперь перепишем предыдущий код на более новую версию Composition API, которая является равноценной Options API, но имеет отличия и более лаконичный вид записи. Во-первых нам понадобится импортировать ещё "ref" & "computed", а вместо data у нас будет "setup". Теперь для реактивной переменной у нас будет "ref", которое присвоим константе "name", также у нас будет computed в nameFilled, коллбэком которой будет сравнивание с нулём и также стрелочная функция для очистки поля ввода в константе cleanName.
// 2.1 Все их мы вернём из setup.
const { createApp, ref, computed } = Vue

const rootComponent = {
	template: `
		<input type="text" v-model="name">
		<button type="button" @click="cleanName" :disabled="!nameFilled">X</button>
		<div v-if="nameFilled">
			<h2>Hello, {{ name }}!</h2>
		</div>
		<div v-else>
			<h2>Введите что-нибудь в строку ввода</h2>
		</div>
	`,
	setup() {
		const name = ref('')
		const nameFilled = computed(() => name.value.length > 0)
		const cleanName = () => name.value = ''

		return {
			name, nameFilled, cleanName
		}
	}
}

const app = createApp(rootComponent)

app.mount('.app');