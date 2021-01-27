import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航标签数据
    navId: '', // 导航标签的id标识
    videoList: [], // 视频列表数据
    videoId: '', // video标识
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

    this.getVideoList(this.data.navId);
  },

  // 获取视频列表数据的功能函数
  async getVideoList(navId){
    let videoListData = await request('/video/group', {id: navId});
    if(!videoListData.datas){
      return;
    }
    // 更新 videoList 状态数据
    let index = 0;
    let videoList = videoListData.datas.map(item => {
        item.id = index++;
        return item;
    })

    // 关闭消息提示框
    wx.hideLoading();
    this.setData({
      videoList
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
      navId: navId>>>0,
      videoList: [], 
    })
    // 显示正在加载
    wx.showLoading({
      title: '正在加载',
    })
    // 获取最新的视频列表数据
    this.getVideoList(this.data.navId);
  },


  // 点击播放/继续播放的回调
  handlePlay(event){

    /*
      需求： 
        1. 当播放新的视频的时候关掉之前播放的视频
      思路： 
        1. 找到关闭视频的方法 wx.createVideoContext(string id, Object this)
        2. 必须找到上一个视频的实例对象，然后关掉
      设计模式： 单例模式 
        1. 需要创建多个对象的情况下，使用一个变量来保存，始终只有一个对象
        2. 当创建新的对象的时候就会把之前的对象覆盖掉
        3. 节省内存空间
    */ 
    let vid = event.currentTarget.id;

    // this.videoContext // undefined || 某一个视频的上下文对象

    // 解决多个视频同时播放的问题
    // this.videoContext && this.vid !== vid  && this.videoContext.stop();

    // if(this.videoContext){
    //   if(this.vid !== vid){
    //     this.videoContext.stop();
    //   }
    // }
    // this.vid = vid;

    // 将当前点击的vid更新至data中videoId
    this.setData({
      videoId: vid
    })
    // 创建视频的上下文对象
    this.videoContext = wx.createVideoContext(vid);
    // 播放当前视频
    this.videoContext.play();
    // videoContext.stop();
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