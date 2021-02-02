<template>
	<view class="cateListContainer">
		<swiper class="banners" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(bannerItem, index) in cateObj.category.bannerUrlList" :key='bannerItem'>
				<view class="swiper-item">
					<image class="bannerImg" :src="bannerItem" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="title">{{cateObj.category.name}}</view>
		<view class="desc">{{cateObj.category.frontDesc}}</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		props: ['navId'],
		data(){
			return {
				cateList: []
			}
		},
		mounted() {
			this.getCateList()
		},
		methods: {
			async getCateList(){
				this.cateList = await request('/getIndexCateList')
			}
		},
		computed: {
			cateObj(){
				return this.cateList.find(item => item.category.parentId === this.navId)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cateListContainer
		.banners
			width 100%
			height 370rpx
			.bannerImg
				width 100%
				height 370rpx
		.title
			font-size 36rpx
			color #333333
			line-height 70rpx
			text-align center
		.desc 
			color #999999
			font-size 26rpx
			text-align center
			line-height 40rpx
			
				
</style>
