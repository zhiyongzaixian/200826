

/*
  1. 封装功能函数
    1) 功能点明确
    2) 函数内部保留固定的代码(静态代码)
    3) 将动态的数据抽取出来，由使用者提供最终的数据， 以形参的形式提取
    4) 一个良好的功能函数应该设置形参的默认值
  2. 封装功能组件
    1) 功能点明确
    2) 组件内部应该保留静态代码
    3) 将动态的数据提取成props参数， 由使用者提供最终的数据
    4） 一个良好的组件应该设置组件props数据的必要性以及数据类型

    <button type='danger' />
    props: {
      type: {
        required: true,
        default: 'primay'
        type: String
      }
    }

*/ 
// 封装发送ajax请求的功能函数
export default (url, data={}, method='GET') => {
  return new Promise((resolve, reject) => {
    // 1. 初始化promise状态为pending
    // 2. 执行异步任务
    wx.request({
      url,
      data,
      method,
    // 3. 根据异步任务的结果修改promise的状态
      success: (res) => {
        // console.log(res.data)
        resolve(res.data); // 修改promise状态为成功状态resolved
      },
      fail: (err) => {
        console.log('请求失败', err);
        reject(err); // 修改promise状态为失败状态 rejected
      }
    })
  
  })
}