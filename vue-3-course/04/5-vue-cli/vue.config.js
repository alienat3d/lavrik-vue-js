const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	// publicPath: '' // если нам требуется поменять стандартный "/" в начале путей к файлам (если мы хотим открывать, например, index.html двойным щелчком по нему без "npm run serve" или загрузки на хостинг)
	// Также мы можем добавить следующие строчки, чтобы вначале проще было ориентироваться в файлах:
	productionSourceMap: false,
	filenameHashing: false
})
