// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '测试数据',
    userInfo: {}, // 用户基本信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------ onLoad 监听页面加载-----')
    // debugger; 
    // console.log(window)

    // // 修改状态数据
    // // Vue React 小程序（this.setData）
    // setTimeout(() => {
    //   this.setData({
    //     msg: '修改之后的数据'
    //   })
  
    //   console.log(this.data.msg)
    // }, 2000)

    // 获取用户信息-  用户授权以后
    wx.getUserInfo({
      success: (res) => {
        console.log(res, '获取用户信息成功')

        // 修改用户状态数据
        this.setData({
          userInfo: res.userInfo
        })
      },
      fail: () => {
        console.log('获取用户信息失败')
      }
    })
  },

  handleParent(){
    console.log('父')
  },

  handleChild(){
    console.log('子')
    
  },

  // 跳转至logs页面
  toLogs(){
    // 跳转至logs页面
    wx.reLaunch({
      url: '/pages/logs/logs',
    })
  },

  // 获取用户信息的回调
  handleGetUserInfo(res){
    // console.log('用户点击了。。。')
    console.log(res);
    if(res.detail.userInfo){
      // 用户点击的允许
      // 更新用户信息
      this.setData({
        userInfo: res.detail.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('------ onReady 监听页面初次渲染完成-----')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------ onShow 监听页面显示-----')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('------ onHide 监听页面隐藏-----')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('------ onUnload 监听页面卸载-----')
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