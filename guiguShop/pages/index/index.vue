<template>
	<view class="indexContainer">
		<!-- 头部区域 -->
		<view class="header">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
			<view class="search">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" value="" placeholder="搜索商品" placeholder-class='placeholder'/>
			</view>
			<button>北方汉子</button>
		</view>
	
		<!-- 导航区域 -->
		<scroll-view scroll-x="true" class="navScroll" enable-flex="true" v-if="indexData.kingKongModule" >
			<view class="navItem " :class="{active: navIndex === -1}" @click="changeNav(-1, 0)">
				推荐
			</view>
			<view class="navItem " :class="{active: navIndex === index}" @click="changeNav(index, item.L1Id)" v-for="(item, index) in indexData.kingKongModule.kingKongList" :key='item.L1Id'>
				{{item.text}}
			</view>
		</scroll-view>
	
		<!-- 内容区 -->
		<scroll-view scroll-y="true" >
			<!-- 推荐对应组件 -->
			<Recommend v-if='!!!navId'></Recommend>
			<CateList v-else :navId='navId'></CateList>
		</scroll-view>
	</view>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
	import request from '../../utils/request.js'
	import Recommend from '../../components/Recommend/Recommend.vue'
	import CateList from '../../components/CateList/CateList.vue'
	export default {
		components: {
			Recommend, CateList
		},
		data() {
			return {
				// indexData: {},
				navIndex: -1, // 导航的标识
				navId: 0, // 导航的id
			};
		},
		mounted() {
			// 测试获取store对象中的数据
			// console.log(this.$store.state.home.initData)
			// this.$store.dispatch('getIndexDataAction')
			// this.getIndexData();
			
			// 分发action
			this.getIndexDataAction()
		},
		methods: {
			...mapActions({
				// key: value, key:在当前组件定义的方法名, value是从store映射的函数名,注意:value不能随便写,必须是store中已有的action
				getIndexDataAction: 'getIndexDataAction'
			}),
			async getIndexData(){
				let result = await request('/getIndexData'); // 小程序
				// let result = await request('/api/getIndexData'); // H5
				this.indexData = result
			},
			// 点击导航的回调
			changeNav(navIndex, navId){
				this.navIndex = navIndex
				this.navId = navId
			}
		},
		computed: {
			...mapState({
				indexData: state => state.home.indexData
			})
		}
	}
</script>

<style lang="stylus">
	/* 
		styles: 
			1. 省略大括号
			2. 省略键值对的封号和冒号
			3. 支持样式缩进，嵌套
			
	 
	 */
	/* 
	原生写法
	.title {
		color: red;
	}
	// stylus写法
	.title 
		color red
	 */
	
	.indexContainer
		.header
			display flex
			padding 10rpx 0
			.logo
				width 140upx
				height 40rpx
				margin 10rpx 20rpx
			.search
				position relative
				width 420rpx
				height 60rpx
				background #eee
				.iconfont
					position absolute
					font-size 30rpx
					top 15rpx
					left 10rpx
				input
					width 370rpx
					margin-left 50rpx
					height 60rpx
					.placeholder
						font-size 26rpx
					
			button
				width 144rpx
				height 60rpx
				text-align center
				line-height 60rpx
				font-size 24rpx
				padding 0 4rpx
				margin 0 10rpx
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				display inline-block
				width 140rpx
				height 80rpx
				text-align center
				line-height 80rpx
				font-size 26rpx
				/* 父级引用， &代表当前位置的父级 */
				&.active
					border-bottom 1rpx solid #BB2C08
				
	
	
.test
	font-size 0
</style>
