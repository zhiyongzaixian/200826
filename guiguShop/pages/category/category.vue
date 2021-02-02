<template>
	<view class="categoryContainer">
		<!-- 头部区域 -->
		<view class="header">
			<view class="search">搜索商品</view>
		</view>
		
		<!-- 内容区 -->
		<view class="contentContainer">
			<!-- 左侧区域 -->
			<view class="leftContainer">
				<scroll-view scroll-y="true" class="navScroll">
					<view class="navItem">
						居家生活
					</view>
					<view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view>
					<view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view><view class="navItem">
						居家生活
					</view>
				</scroll-view>
			</view>
			
			<!-- 右侧区域 -->
			<view class="rightContainer"></view>
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
	.categoryContainer
		.header
			padding 10rpx 0
			.search
				width 92%
				height 60rpx
				text-align center
				line-height 60rpx
				font-size 26rpx
				background #EEE
				margin 0 auto
		.contentContainer
			height 800rpx
			display flex
			border-top 1rpx solid #333
			.leftContainer
				width 20%
				height 100%
				border-right 1rpx solid #333333
				box-sizing border-box
				.navScroll
					height calc(100vh - 82rpx)
					.navItem
						font-size 26rpx
						height 80rpx
						line-height 80rpx
						text-align center
						
			.rightContainer
				width 80%
				height 100%
				background #C0C0C0
			
</style>
