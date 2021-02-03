const KoaRouter = require('koa-router');
const jwt = require('jsonwebtoken');
const Fly = require("flyio/src/node")
const fly = new Fly;
// 2. 生成路由器对象
const router = new KoaRouter();
// express: request response next
// koa: ctx(request response), next
// router.get('/test', (ctx) => {
// 	// 1. 获取请求参数
// 	// 2. 处理请求数据
// 	// 3. 返回响应数据
// 	ctx.body = '返回测试数据';
// });

// 注册index主页的接口
const indexData = require('../datas/index.json');
// console.log(indexData, typeof indexData) // Object
router.get('/getIndexData', (ctx) => {
	ctx.body = indexData;
});

// 注册分类页数据
const categoryDatas = require('../datas/categoryDatas.json');
router.get('/getCategoryData', (ctx) => {
	ctx.body = categoryDatas;
});

// 主页分类数据
const indexCateList = require('../datas/indexCateList.json');
router.get('/getIndexCateList', (ctx) => {
	ctx.body = indexCateList;
});


// 获取用户openId
router.get('/getOpenId', async (ctx) => {
	// 1. 接收请求参数
	let code = ctx.query.code;
	// 2. 整合数据对接微信服务器
	let appId = 'wx810e8b1fde386fde';
	let appSecret = '59c4a57fb7745d0cbe19f3a9289fa135';
	// 3. 接收到微信服务器返回的数据，对当前用户数据进行自定义绑定，加密
	let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
	let result = await fly.get(url)
	let openId = JSON.parse(result.data).openid;
	console.log('openId: ', openId);
	// 4. 返回给浏览器端当前用户加密后的标识
	let userInfo = {
		openId,
		usuername: 'curry',
		age: 33
	}
	
	// 4.1 对用户数据加密生成token
	let token = jwt.sign(userInfo, 'atguigu');
	// 4.2 反编译token字段
	// result = jwt.verify(token) // secret or public key must be provided
	// result = jwt.verify(token, 'xxx') // invalid signature
	result = jwt.verify(token, 'atguigu') // invalid signature
	console.log(result)
	// 5. 返回加密之后的数据给浏览器端
	ctx.body = token;
});


// 向外暴露路由器对象
module.exports = router;
