import Vue from 'vue'
import App from './App'

// 关闭生产提示
Vue.config.productionTip = false

// 声明当前的组件App代表整个应用application
App.mpType = 'app'


const app = new Vue({
    ...App
})

// new Vue({
// 	el: '#app',
// 	render: h => h(App)
// })

// 挂载整个实例 === 原生小程序App()
app.$mount()
