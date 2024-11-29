const { createApp } = Vue

const app = createApp({
	data() {
		return {
			name: 'world'
		}
	}
})

app.mount('.app');