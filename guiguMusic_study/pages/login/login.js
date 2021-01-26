/*
  登录说明： 
    1. 收集表单项数据
    2. 前端验证
      1）验证用户信息是否合法(账号，密码的格式)
      2) 前端验证不通过，就提示用户内容不合法，不需要发请求进行后端验证
      3) 前端验证通过，发请求(账号，密码)进行后端验证
    3. 后端验证
      1) 验证当前用户是否存在
      2）如果该用户不存在，直接返回登录失败(该用户不存在)
      3）该用户存在，需要验证密码是否正确
      4) 密码不正确，返回给前端，并提示密码不正确
      5) 密码正确，返回登录成功数据

*/
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    phone: '', // 用户账号
    password: '' // 密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 表单项事件的回调
  handleInput(event){
    console.log(event);
    // let type = event.currentTarget.id; // id 适合传唯一标识
    let type = event.currentTarget.dataset.type; // data-key=value 适合传多个值
    this.setData({
      [type]: event.detail.value
    })

    // let a = 'name'
    // let obj = {}
    // obj[a] = 'xxx'
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})