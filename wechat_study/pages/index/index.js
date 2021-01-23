// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '测试数据'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
    // console.log(window)

    // // 修改状态数据
    // // Vue React 小程序（this.setData）
    // setTimeout(() => {
    //   this.setData({
    //     msg: '修改之后的数据'
    //   })
  
    //   console.log(this.data.msg)
    // }, 2000)
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