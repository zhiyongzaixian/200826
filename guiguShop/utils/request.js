// 封装发请求的方法
import config from './config.js';
export default (url, data={}, method='GET') => {
	return new Promise((resolve, reject) => {
		// 执行异步任务
		uni.request({
			url: config.host + url, // 小程序
			// url, // H5
			data,
			method,
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			}
		})
	});
}