import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
import cart from './modules/cart.js'
// 声明使用Vuex的扩展库
// 面试题： Vue.use()都了哪些事情？？？
Vue.use(Vuex)

// 1. 创建store对象

const store = new Vuex.Store({
	modules:{
		home,
		cart
	}
})


export default store