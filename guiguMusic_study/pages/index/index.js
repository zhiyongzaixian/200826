import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [], // 轮播图的数据
    recommendList: [], // 推荐歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitData();
  },

  // 封装获取初始化数据函数
  async getInitData(){
    // 发请求获取数据
    let result = await request('/banner', {type: 2})
    // 修改banners数据
    this.setData({
      banners: result.banners
    })

    // 获取推荐歌曲数据
    result = await request('/personalized')
    // 修改recommendList数据
    this.setData({
      recommendList: result.result
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