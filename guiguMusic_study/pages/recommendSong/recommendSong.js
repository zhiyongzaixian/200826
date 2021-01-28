import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendList: [], // 每日推荐数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 动态获取当前日期
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })

    this.getRecommendList();
  },

  // 获取每日推荐recommendList数据的功能函数
  async getRecommendList(){
    let recommendListData = await request('/recommend/songs');

    // 更新状态
    this.setData({
      recommendList: recommendListData.recommend
    })
  },

  // 跳转至songDetail的回调
  toSongDetail(event){
    let song = event.currentTarget.dataset.song;
    console.log(song);

    // 路由跳转传参： query
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?song=' + JSON.stringify(song),
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