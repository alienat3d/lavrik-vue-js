const { defineConfig } = require('@vue/cli-service')

// 1.6 Здесь в "publicPath" должно стоять "/" для корректного перехода на нужную страницу, при вводе адреса в адресную строку.
// Go to [vue-3-course\07\src\App.vue]
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: '/',
	productionSourceMap: true,
	filenameHashing: false
})
