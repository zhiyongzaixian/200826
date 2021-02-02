<template>
	<view class="recommendContainer">
		<swiper class="banners" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="https://yanxuan.nosdn.127.net/5d7ca0e230705bb9d7030655967d676f.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="https://yanxuan.nosdn.127.net/e8f188db1a1ac973c3fe60e932b0609e.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="https://yanxuan.nosdn.127.net/5098192a101eda93de2ecd50067e402a.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	
		<!-- policyDescList 三个图标区域 -->
		<view class="policyList">
			<view class="policyItem" v-for="(item, index) in indexData.policyDescList" :key='item.desc'>
				<image class="policyImg" :src="item.icon" mode=""></image>
				<text class="content">{{item.desc}}</text>
			</view>
		</view>
		
		<!-- kingKongList 10个图标区域 -->
		<view class="kingKongList" v-if="indexData.kingKongModule">
			<view class="kingKongItem" v-for="item in indexData.kingKongModule.kingKongList" :key='item.L1Id'>
				<image class="kingImage" :src="item.picUrl" mode=""></image>
				<text class="kingContent">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState({
				indexData: state => state.home.indexData
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.recommendContainer
		.banners
			width 100%
			height 350rpx
			.bannerImg
				width 100%
				height 350rpx
		.policyList
			display flex
			.policyItem
				flex 1
				text-align center
				.policyImg
					width 32rpx
					height 32rpx
					vertical-align middle
				.content
					font-size 24rpx
					vertical-align middle
					
				
				
				
		.kingKongList
			display flex
			flex-wrap wrap
			.kingKongItem
				width 20%
				display flex
				flex-direction column
				align-items center
				.kingImage
					width 110rpx
					height 110rpx
					margin 20rpx 0
				.kingContent
					font-size 26rpx

.test
	font-size 0
</style>
