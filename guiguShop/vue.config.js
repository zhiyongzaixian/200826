module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true,
				pathRewrite: { // 路径重写
					'^/api': ''
				}
      }
    }
  }
}

