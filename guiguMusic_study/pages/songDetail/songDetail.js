import PubSub from 'pubsub-js';
import request from '../../utils/request';

// 获取全局app实例
let appInstance = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, // 标识音乐是否播放
    song: {}, // 歌曲详情对象
    musicId: '', // 音乐id标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    /*

      options: 用来接收路由跳转的参数，默认值是空对象
      JSON.parse 将json对象编译成js对象

      注意！！！ 原生小程序url有长度限制，如果传参内容过长会自动截取掉
      console.log(options.song)
      let song = JSON.parse(options.song);options: 用来接收路由跳转的参数，默认值是空对象
      JSON.parse 将json对象编译成js对象

      注意！！！ 原生小程序url有长度限制，如果传参内容过长会自动截取掉
      console.log(options.song)
      let song = JSON.parse(options.song);
      
    */

    // 获取音乐id
    let musicId = options.musicId;
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId);

    // 判断当前页面音乐是否在播放
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      // 音乐在播放, 修改当前页面音乐的播放状态 为 true
      this.setData({
        isPlay: true
      })

    }

    // 生成背景音频的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监听音乐播放/暂停/停止
    this.backgroundAudioManager.onPlay(() => {
      this.changeIsPlayState(true);
      appInstance.globalData.musicId = musicId;
    });
    this.backgroundAudioManager.onPause(() => {
      this.changeIsPlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changeIsPlayState(false);
    });

  },
  // 封装修改状态的功能函数
  changeIsPlayState(isPlay){
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay;
  },

  // 封装获取音乐详情的功能函数
  async getMusicInfo(musicId){
    let songData = await request('/song/detail', {ids: musicId});
    // 更新song详情对象
    this.setData({
      song: songData.songs[0]
    })

    // 动态修改窗口的标题
    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
  },
  // 点击播放/暂停的回调
  handleMusicPlay(){
    let isPlay = !this.data.isPlay;
    // 修改是否播放的状态
    // this.setData({
    //   isPlay
    // })
    let {musicId} = this.data;
    this.musicControl(isPlay, musicId);
  },

  // 封装控制音乐播放/暂停的功能函数
  async musicControl(isPlay, musicId){
    
    if(isPlay){ // 播放音乐
      // 获取音乐播放地址
      let musicLinkData = await request('/song/url', {id: musicId});
      let musicLink = musicLinkData.data[0].url;
     
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.song.name;

      // 修改全局的播放状态
      // appInstance.globalData.isMusicPlay = true;
      // appInstance.globalData.musicId = musicId;
    }else { // 暂停音乐
      this.backgroundAudioManager.pause();

      // 修改全局的播放状态
      // appInstance.globalData.isMusicPlay = false;
      // appInstance.globalData.musicId = musicId;
    }

  },

  // 点击切换歌曲的回调
  handleSwitch(event){
    // 获取切换歌曲的类型
    let type = event.currentTarget.id;

    // 将切换歌曲的类型发送给recommendSong页面
    PubSub.publish('switchType', type);

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