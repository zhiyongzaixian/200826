import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航标签数据
    navId: '', // 导航标签的id标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList();
  },

  // 获取导航标签数据的功能函数
  async getVideoGroupList(){
    let result = await request('/video/group/list');

    // 更新 videoGroupList 的状态数据
    // slice splice(会影响原数组)
    this.setData({
      videoGroupList: result.data.slice(0, 14),
      navId: result.data[0].id
    })
  },

  // 点击导航切换的回调
  changeNav(event){
    //let navId = event.currentTarget.id; // 会自动将 number转换成string

    let navId = event.currentTarget.dataset.id;
    console.log(navId, typeof navId)
    // 修改navId的状态

    // 位移运算符
    // 将目标数据先转换成二进制，然后去移动指定的位数，移出去的不要，不够的用零补齐
    // 位移零位会强制转换数据类型为number
    // 布尔值： !!!
    let num = 3;
    // 0000 0011
    //   000000 00
    // console.log(num >>> 2) // 0
    this.setData({
      navId: navId>>>0
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