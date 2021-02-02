import request from '../../utils/request.js'

const state = {
	initData: 'Vuex的测试数据',
	indexData: {}, // 主页数据
}

const mutations = {
	changeIndexDataMutation(state, indexData){
		// 同步修改状态数据
		state.indexData = indexData
	}
}


const actions = {
	async getIndexDataAction({commit}){
		// console.log('getIndexDataAction()')
		// 1. 执行异步任务
		let result = await request('/getIndexData'); // 小程序
		// 2. 触发mutation，同时将异步数据交给mutation
		commit('changeIndexDataMutation', result)
	}
}

const getters = {
	
}


// 向外暴露
export default {
	state,
	mutations,
	actions,
	getters
}
