import Vue from 'vue'

// 管理购物车数据
const state = {
	cartList: [
		{
			"isSelected": true,
			"count": 2,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [
			{
			"itemId": 1535004,
			"tagId": 128111157,
			"freshmanExclusive": false,
			"name": "暖冬特惠",
			"subType": 204,
			"forbidJump": false,
			"type": 2
			}
			],
			"rank": 1,
			"id": 1535004,
			"sellVolume": 4001,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101761748,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575893634989,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "男式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1636062,
			"displaySkuId": 1636056,
			"productPlace": "",
			"itemSizeTableFlag": false
		},
		{
			"isSelected": false,
			"count":3,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [
			{
			"itemId": 1536001,
			"tagId": 128111157,
			"freshmanExclusive": false,
			"name": "暖冬特惠",
			"subType": 204,
			"forbidJump": false,
			"type": 2
			}
			],
			"rank": 1,
			"id": 1536001,
			"sellVolume": 3634,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101896296,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575894115275,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "女式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1634105,
			"displaySkuId": 1634104,
			"productPlace": "",
			"itemSizeTableFlag": false
			}
	]
}

const mutations = {
	// 添加商品数据至cartList
	addShopItemMutation(state, shopItem){
		/* 
		 思路： 
			1. 购物车已有该商品： 在原有的商品count上累加
			2. 购物车没有改商品，直接添加该商品至购物车
	  */
		let shopObj = state.cartList.find(item => item.id === shopItem.id)
		
		if(shopObj){ // 购物车已有该商品
			shopObj.count += 1
			console.log(shopObj.count)
		}else { // 购物车没有改商品
		
			// 非响应式数据
			// shopItem.count = 1
			// shopItem.isSelected = true
			
			// 响应式数据
			Vue.set(shopItem, 'count', 1)
			Vue.set(shopItem, 'isSelected', true)
			state.cartList.push(shopItem)
		}
		
	},
	
	// 修改数量
	changeCountMutation(state, {isAdd, index}){
		if(isAdd){
			state.cartList[index].count += 1
		}else {
			
			// 判断商品数量是否大于1
			if(state.cartList[index].count > 1){
				state.cartList[index].count -= 1
			}else {
				wx.showModal({
					content: '你确认删除该商品吗',
					success: (res) => {
						if(res.confirm){
							// 删除该商品
							state.cartList.splice(index, 1)
						}
					}
				})
				
			}
		}
		
	},
	// 修改是否选中状态
	changeIsSelectedMutation(state, {isSelected, index}){
		state.cartList[index].isSelected = isSelected
	},
	// 全选/全不选
	changeAllSelectedMutation(state, isSelected){
		state.cartList.forEach(item => item.isSelected = isSelected)
	}
}

const actions = {
	
}

const getters = {
	isAllSelected(state){
		/* 
			every:所有的元素都满足条件
			
			some: 只要有一个满足条件就为true
		 */
		return state.cartList.every(item => item.isSelected)
	},
	
	// 总数量
	totalCount(state){
		return state.cartList.reduce((pre, shopItem) => {
			return pre += shopItem.isSelected?shopItem.count:0
		}, 0)
	},
	
	
	// 总价格
	totalPrice(state){
		return state.cartList.reduce((pre, shopItem) => {
			return pre += shopItem.isSelected?shopItem.count*shopItem.retailPrice:0
		}, 0)
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}