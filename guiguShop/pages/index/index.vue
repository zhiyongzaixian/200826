<template>
	<view class="indexContainer">
		<!-- 头部区域 -->
		<view class="header">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
			<view class="search">
				<input type="text" value="" placeholder="搜索商品" placeholder-class='placeholder'/>
			</view>
			<button>北方汉子</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
				width 420rpx
				height 60rpx
				background #eee
				input
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
			
</style>
