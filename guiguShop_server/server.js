// 引入依赖包
const Koa = require('koa');
const router = require('./router');

// 1. 生成应用实例
const app = new Koa();



// 3. 声明使用路由中间键
app
	.use(router.routes()) // 声明使用路由
	.use(router.allowedMethods()) // 声明使用路由方法
	
	
// 4.监听端口号
app.listen('3001', (err) => {
	if(err){
		console.log(err);
		return;
	}
	console.log('服务器启动成功')
	console.log('服务器地址: http://localhost:3001')
});