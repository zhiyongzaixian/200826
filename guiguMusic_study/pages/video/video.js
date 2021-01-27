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
    videoUpdateTime: [], // 记录实时播放的时长
    isTriggered: false, // 标识下拉刷新是否被触发
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
      videoList,
      isTriggered: false
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
    // 判断当前是否是否有播放时间记录
    let {videoUpdateTime} = this.data;
    let videoItem  = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      // 跳转至指定的位置播放
      this.videoContext.seek(videoItem.currentTime);
    }
    // 播放当前视频
    this.videoContext.play();
    // videoContext.stop();
  },

  // 视频播放进度实时变化的回调
  handleTimeUpdate(event){
    // currentTime: 2.078819
    // duration: 86.3
    // 1. 整理数据
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime}

    // 2. 添加播放记录到 videoUpdateTime
    /*
      思路： 判断videoUpdateTime中是否已经有当前视频的播放记录
      1. 如果有：修改播放的时长为当前的时长
      2. 如果没有: 将当前视频的播放时长记录添加至videoUpdateTime
    */
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === event.currentTarget.id);
    if(videoItem){ // 之前有过
      videoItem.currentTime = event.detail.currentTime;
    }else {// 之前没有添加过
      videoUpdateTime.push(videoTimeObj)
    }

    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime
    })

  },

  // 监听视频播放结束的事件
  handleEnded(event){
    // 将当前视频的播放记录从 videoUpdateTime 中移除
    let {videoUpdateTime} = this.data;
    // videoUpdateTime.splice(startIndex, count);
    
    // videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id);
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1);
    
    this.setData({
      videoUpdateTime
    })
  },

  // 下拉刷新的回调
  handleRefresher(){
    // 发送请求获取最新的视频数据
    this.getVideoList(this.data.navId);
  },

  // scroll-view上拉触底的回调
  handleToLower(){
    console.log('scrollview上拉触底')
    // 模拟假数据
    let newVideoList = [
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_F01FF0F2113E2423D2E21E407DBA9257",
              "coverUrl": "https://p2.music.126.net/srKTFvAPE5z6olXrAnZZEw==/109951163881420076.jpg",
              "height": 1080,
              "width": 1920,
              "title": "《你要的全拿走》之大型翻车现场",
              "description": "《你要的全拿走》之大型翻车现场",
              "commentCount": 137,
              "shareCount": 266,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 10547199
                  },
                  {
                      "resolution": 480,
                      "size": 17521088
                  },
                  {
                      "resolution": 720,
                      "size": 24573778
                  },
                  {
                      "resolution": 1080,
                      "size": 43048789
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 320000,
                  "authStatus": 1,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/4PZ5Ueff9z32Br_ACHXDfA==/3273246125707419.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 320100,
                  "birthday": 1410364800000,
                  "userId": 60370317,
                  "userType": 1,
                  "nickname": "果酱音乐",
                  "signature": "知名音乐媒体，微信公众号【果酱音乐】，公司介绍：http://media.jammyfm.com 宣传、采访、品牌合作请发送邮件至ad@jammyfm.com",
                  "description": "音乐媒体果酱音乐官方账号",
                  "detailDescription": "音乐媒体果酱音乐官方账号",
                  "avatarImgId": 3273246125707419,
                  "backgroundImgId": 109951163049659660,
                  "backgroundUrl": "http://p1.music.126.net/rpqxtYeJ0obNWTVth5K4Eg==/109951163049659662.jpg",
                  "authority": 3,
                  "mutual": false,
                  "expertTags": [
                      "另类/独立",
                      "摇滚",
                      "民谣"
                  ],
                  "experts": null,
                  "djStatus": 10,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "3273246125707419",
                  "backgroundImgIdStr": "109951163049659662"
              },
              "urlInfo": {
                  "id": "F01FF0F2113E2423D2E21E407DBA9257",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/Ff2wWlID_2330071504_uhd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=zbjNjQQcZEclpvpMSvfyWrdzEtaNpRqt&sign=0334fd2f95e685321875a209cc15c3ad&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 43048789,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 57110,
                      "name": "饭拍现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 59101,
                      "name": "华语现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 57108,
                      "name": "流行现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "你要的全拿走",
                      "id": 529668356,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 3066,
                              "name": "胡彦斌",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [
                          "Take Everything You Want"
                      ],
                      "pop": 100,
                      "st": 0,
                      "rt": null,
                      "fee": 1,
                      "v": 47,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 37391092,
                          "name": "覅忒好",
                          "picUrl": "http://p4.music.126.net/9uUWLnRsv4c0F0wu9dlttA==/109951163118372627.jpg",
                          "tns": [],
                          "pic_str": "109951163118372627",
                          "pic": 109951163118372620
                      },
                      "dt": 299333,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 11975619,
                          "vd": -20900
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 7185389,
                          "vd": -18400
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 4790274,
                          "vd": -17400
                      },
                      "a": null,
                      "cd": "1",
                      "no": 3,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 2,
                      "s_id": 0,
                      "rtype": 0,
                      "rurl": null,
                      "mst": 9,
                      "cp": 22036,
                      "mv": 5779938,
                      "publishTime": 1515513600000,
                      "privilege": {
                          "id": 529668356,
                          "fee": 1,
                          "payed": 0,
                          "st": 0,
                          "pl": 0,
                          "dl": 0,
                          "sp": 0,
                          "cp": 0,
                          "subp": 0,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 0,
                          "toast": false,
                          "flag": 1028,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "F01FF0F2113E2423D2E21E407DBA9257",
              "durationms": 485645,
              "playTime": 658705,
              "praisedCount": 3510,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_1CC2180CCB97B95362801368A1F69D52",
              "coverUrl": "https://p2.music.126.net/D525TfrhUMuvJ-jGDcEp2A==/109951164343736018.jpg",
              "height": 720,
              "width": 1280,
              "title": "10岁小女孩德国儿童好声音现场演唱《Happy》惊艳全场！",
              "description": "10岁小女孩Anisa德国儿童好声音现场演唱《Happy》惊艳全场！一开口就沦陷了～",
              "commentCount": 100,
              "shareCount": 122,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 37421177
                  },
                  {
                      "resolution": 480,
                      "size": 63506117
                  },
                  {
                      "resolution": 720,
                      "size": 69212320
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 1000000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/Edqapc_7GlSG2ilpkY9_xg==/109951164211458351.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 1001300,
                  "birthday": 1476028800000,
                  "userId": 349697526,
                  "userType": 201,
                  "nickname": "Daisy_筱筱er",
                  "signature": "I'm just folk，I have mood swings. 谢谢小可爱们的关注！主要更新欧美现场（包括很多宝藏歌手的现场） 也会更新欧美翻唱等等一切与欧美音乐相关的视频！一个小小的YouTube视频搬运工～",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951164211458350,
                  "backgroundImgId": 109951163138406500,
                  "backgroundUrl": "http://p1.music.126.net/IAHf10vRjrQxgHr2Jzs_gA==/109951163138406492.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": {
                      "1": "音乐视频达人"
                  },
                  "djStatus": 0,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "109951164211458351",
                  "backgroundImgIdStr": "109951163138406492",
                  "avatarImgId_str": "109951164211458351"
              },
              "urlInfo": {
                  "id": "1CC2180CCB97B95362801368A1F69D52",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/QaadRu89_2594665196_shd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=WEEUceOyXwmrrWVaJEppHjpJkigTYwgL&sign=ad54812daf788ae2ad8b21e02e302344&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 69212320,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 720
              },
              "videoGroup": [
                  {
                      "id": -25347,
                      "name": "#『欧美』节奏控福利，抖腿族必备#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 75122,
                      "name": "欧美综艺",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 57106,
                      "name": "欧美现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 14212,
                      "name": "欧美音乐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "Happy",
                      "id": 26548584,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 41151,
                              "name": "Pharrell Williams",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [
                          "电影《神偷奶爸2》插曲"
                      ],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 8,
                      "v": 177,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 2522067,
                          "name": "Despicable Me 2 (Original Motion Picture Soundtrack)",
                          "picUrl": "http://p3.music.126.net/CiZTgd1Frwf6dgVJIJxLfA==/109951164724862545.jpg",
                          "tns": [
                              "神偷奶爸2"
                          ],
                          "pic_str": "109951164724862545",
                          "pic": 109951164724862540
                      },
                      "dt": 233305,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 9335162,
                          "vd": -44875
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 5601115,
                          "vd": -42343
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 3734091,
                          "vd": -40749
                      },
                      "a": null,
                      "cd": "1",
                      "no": 4,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 1,
                      "s_id": 0,
                      "rtype": 0,
                      "rurl": null,
                      "mst": 9,
                      "cp": 743010,
                      "mv": 206025,
                      "publishTime": 1371484800007,
                      "privilege": {
                          "id": 26548584,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 5,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "1CC2180CCB97B95362801368A1F69D52",
              "durationms": 178980,
              "playTime": 357532,
              "praisedCount": 1801,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_AB473D66AB42DF702F75EF171287BB2A",
              "coverUrl": "https://p2.music.126.net/07P0_4Da_IGz7Cr7y59m_A==/109951163460452876.jpg",
              "height": 1080,
              "width": 1920,
              "title": "李圣经在Running Man 大跳女团性感舞蹈~~满屏的大长腿",
              "description": "李圣经之前参加Running Man节目大跳女团性感舞蹈~~\n经儿的大长腿~~~米奇比心[爱心]\n#李圣经##多才多艺的李圣经#",
              "commentCount": 6,
              "shareCount": 2,
              "resolutions": [
                  {
                      "resolution": 1080,
                      "size": 18299888
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 340000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/wdzIKI3jwQElNA80N35DDQ==/109951164295920344.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 341500,
                  "birthday": 820425600000,
                  "userId": 125916855,
                  "userType": 0,
                  "nickname": "KeNaiL",
                  "signature": "想去看的演唱会：BIGBANG，毛不易，华晨宇，李健，赵雷，好妹妹乐队！如果只能选一个，我选野菊花乐队~~",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951164295920350,
                  "backgroundImgId": 109951163735578340,
                  "backgroundUrl": "http://p1.music.126.net/AwV3xSCQjRbZSUvNDR4MKQ==/109951163735578343.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 10,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "109951164295920344",
                  "backgroundImgIdStr": "109951163735578343",
                  "avatarImgId_str": "109951164295920344"
              },
              "urlInfo": {
                  "id": "AB473D66AB42DF702F75EF171287BB2A",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/Olkac05R_1878224817_uhd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=joYvBmgWWfaOCRVCsuvLLVSXnLeiuimj&sign=990a78ced3cdd36111ebd2bf2b5760d7&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 18299888,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 3101,
                      "name": "综艺",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 25137,
                      "name": "音乐资讯",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 4101,
                      "name": "娱乐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1101,
                      "name": "舞蹈",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": [
                  109
              ],
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "AB473D66AB42DF702F75EF171287BB2A",
              "durationms": 37160,
              "playTime": 28442,
              "praisedCount": 82,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_6D41F906480FA480AB690430DC93EA9E",
              "coverUrl": "https://p2.music.126.net/vtcBgC1dRaoeXLYGVQD2kA==/109951164966187269.jpg",
              "height": 720,
              "width": 1280,
              "title": "蔡徐坤/青春有你2训练生 - HOME（相信未来义演 Live版）超清版",
              "description": "【粉丝投稿】蔡徐坤/青春有你2训练生 - HOME（相信未来义演 Live版）20/05/05 超清版\r\n\r\n投稿材料：\r\n1：超清画质以上（可包含）的视频 \r\n2：视频的原链接 \r\n3：视频标题（艺人/歌曲名/节目名/是否为Live版） \r\n4：视频封面（选填） \r\n\r\n投稿邮箱：ly-to@foxmail.com",
              "commentCount": 121,
              "shareCount": 136,
              "resolutions": [
                  {
                      "resolution": 720,
                      "size": 23532658
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 460000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/4vOGIEMQNJPkDX8I-Lg-NA==/109951165108395413.jpg",
                  "accountStatus": 0,
                  "gender": 1,
                  "city": 460100,
                  "birthday": 916070400000,
                  "userId": 449157773,
                  "userType": 0,
                  "nickname": "LY-TO",
                  "signature": "私人号，不是站子。\n持续更新优质舞台，转赞评加热度哦！\n专注自家即可，记得关注我哦！\n其他艺人舞台也可更新，接受粉丝视频投稿！\n\n投稿材料：\n1：超清画质以上（可包含）的视频\n2：视频的原链接\n3：视频标题（艺人/歌曲名/节目名/是否为Live版）\n4：视频发生日期（年/月/日）\n5：视频封面（选填）\n\n投稿邮箱：ly-to@foxmail.com",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951165108395410,
                  "backgroundImgId": 109951163885412640,
                  "backgroundUrl": "http://p1.music.126.net/9k73nsZ09YzW8_7EUGZPcA==/109951163885412633.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 0,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "109951165108395413",
                  "backgroundImgIdStr": "109951163885412633",
                  "avatarImgId_str": "109951165108395413"
              },
              "urlInfo": {
                  "id": "6D41F906480FA480AB690430DC93EA9E",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/RdpOp65z_2991484837_shd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=SlBmHgLBEJDRRSlIHMLqZANpVPKNnhev&sign=24ce13f64861cdcd7e56e974af418d4d&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 23532658,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 720
              },
              "videoGroup": [
                  {
                      "id": 26133,
                      "name": "蔡徐坤",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 12110,
                      "name": "偶像练习生",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 59101,
                      "name": "华语现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58101,
                      "name": "听BGM",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 23116,
                      "name": "音乐推荐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "Home",
                      "id": 1438865460,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 12932368,
                              "name": "蔡徐坤",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 0,
                      "v": 4,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 87797570,
                          "name": "Home",
                          "picUrl": "http://p3.music.126.net/vs-Bg4Camyvlmi3_QYmiDg==/109951164886377774.jpg",
                          "tns": [],
                          "pic_str": "109951164886377774",
                          "pic": 109951164886377780
                      },
                      "dt": 141253,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 5652942,
                          "vd": -29589
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 3391782,
                          "vd": -26986
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 2261203,
                          "vd": -25382
                      },
                      "a": null,
                      "cd": "01",
                      "no": 0,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 0,
                      "s_id": 0,
                      "rtype": 0,
                      "rurl": null,
                      "mst": 9,
                      "cp": 0,
                      "mv": 10926180,
                      "publishTime": 0,
                      "privilege": {
                          "id": 1438865460,
                          "fee": 0,
                          "payed": 0,
                          "st": 0,
                          "pl": 320000,
                          "dl": 999000,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 320000,
                          "toast": false,
                          "flag": 0,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "6D41F906480FA480AB690430DC93EA9E",
              "durationms": 136114,
              "playTime": 147919,
              "praisedCount": 2627,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_1E56471F73AE7BCBB7DB936E862C8200",
              "coverUrl": "https://p2.music.126.net/h2DJIvLARXZ2GALx6cVRyw==/109951164744757562.jpg",
              "height": 720,
              "width": 1280,
              "title": "2020 藏歌 班措 诞生之歌",
              "description": null,
              "commentCount": 95,
              "shareCount": 1623,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 20340910
                  },
                  {
                      "resolution": 480,
                      "size": 33685844
                  },
                  {
                      "resolution": 720,
                      "size": 58435478
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 630000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/KEbFvRw5hE6_yz1smmGM4A==/109951163917193877.jpg",
                  "accountStatus": 0,
                  "gender": 1,
                  "city": 630100,
                  "birthday": 1029395513547,
                  "userId": 1345428586,
                  "userType": 0,
                  "nickname": "岭tubaga",
                  "signature": "我们做某件事总喜欢找些理由，我们总以为今天的打拼是为了明天的快乐。可是，快乐不在路的终点，它就在我们走着的路上。所以，理由有时只是一个错误的借口，它让我们原本轻快的心慢慢地疲惫和麻木。还原事物的本质，就是在还原我们自己，有些事情不是看到希望才去坚持，而是坚持了才会看到希望。",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951163917193870,
                  "backgroundImgId": 109951164947527400,
                  "backgroundUrl": "http://p1.music.126.net/zMxbwaVVeIvi5II6IRKdWw==/109951164947527395.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 0,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "109951163917193877",
                  "backgroundImgIdStr": "109951164947527395",
                  "avatarImgId_str": "109951163917193877"
              },
              "urlInfo": {
                  "id": "1E56471F73AE7BCBB7DB936E862C8200",
                  "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/t8F2X2iR_2917711785_shd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=kEZRQdTDmCjJHlmpJtHFeEmrZSYfpdxr&sign=c793fa4e638645439adc341c92327db5&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 58435478,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 720
              },
              "videoGroup": [
                  {
                      "id": 59108,
                      "name": "巡演现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 57108,
                      "name": "流行现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "1E56471F73AE7BCBB7DB936E862C8200",
              "durationms": 183280,
              "playTime": 553432,
              "praisedCount": 3313,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_D28566EB0ED13932AD62A0E1F2656060",
              "coverUrl": "https://p2.music.126.net/ez744L-04v_VGJ7rCdS2rg==/109951164696314774.jpg",
              "height": 360,
              "width": 634,
              "title": "李凡一 《亲爱的那不是爱情》冠军战队争夺战",
              "description": "",
              "commentCount": 54,
              "shareCount": 181,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 22599230
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 440000,
                  "authStatus": 1,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/YhnmHZYWzQUyXoRM8YrNSQ==/109951165420541337.jpg",
                  "accountStatus": 0,
                  "gender": 1,
                  "city": 441500,
                  "birthday": 1043769600000,
                  "userId": 1688690650,
                  "userType": 4,
                  "nickname": "D丶DOS",
                  "signature": "Brakes are death",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951165420541340,
                  "backgroundImgId": 109951165147376770,
                  "backgroundUrl": "http://p1.music.126.net/mI0U1TGJai0InUDD8q9aCA==/109951165147376773.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 10,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "109951165420541337",
                  "backgroundImgIdStr": "109951165147376773",
                  "avatarImgId_str": "109951165420541337"
              },
              "urlInfo": {
                  "id": "D28566EB0ED13932AD62A0E1F2656060",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/n25gWYnk_2900982801_sd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=IfnucunhxbuXMzqXAESxUbGdDtfxVHhR&sign=be61145525ee601eb69e053709bc29ac&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 22599230,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 240
              },
              "videoGroup": [
                  {
                      "id": 3101,
                      "name": "综艺",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 4101,
                      "name": "娱乐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "D28566EB0ED13932AD62A0E1F2656060",
              "durationms": 230080,
              "playTime": 217352,
              "praisedCount": 1224,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_E5291D376CF89CB94778DF5CB546A1B7",
              "coverUrl": "https://p2.music.126.net/5Jz_nG8HGUTNGUDW0GAlBA==/109951164725898515.jpg",
              "height": 1080,
              "width": 1920,
              "title": "“王牌特工”宋茜 唱跳新歌《屋顶着火》",
              "description": "“王牌特工”宋茜 唱跳新歌《屋顶着火》",
              "commentCount": 88,
              "shareCount": 147,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 36940708
                  },
                  {
                      "resolution": 480,
                      "size": 63905843
                  },
                  {
                      "resolution": 720,
                      "size": 95972151
                  },
                  {
                      "resolution": 1080,
                      "size": 147597292
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 310000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/PfAjGOrYTepLWBELSrhSWg==/109951163981832642.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 310101,
                  "birthday": 848419200000,
                  "userId": 35672686,
                  "userType": 204,
                  "nickname": "Kpop现场舞台",
                  "signature": "更新现场舞台、混剪视频等，喜欢就关注吧，欢迎私信聊骚。",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951163981832640,
                  "backgroundImgId": 109951163981827860,
                  "backgroundUrl": "http://p1.music.126.net/6psTiF36TwQ4cPW8TgU0Fg==/109951163981827851.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": {
                      "1": "舞蹈视频达人"
                  },
                  "djStatus": 10,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "109951163981832642",
                  "backgroundImgIdStr": "109951163981827851",
                  "avatarImgId_str": "109951163981832642"
              },
              "urlInfo": {
                  "id": "E5291D376CF89CB94778DF5CB546A1B7",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/ZHJxH7Ih_2911107012_uhd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=aNgOxiUPYkALACVWrwsEyeKvenpgLlqL&sign=c05080a2cd057d3f6cc3a0282ff1e2b6&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 147597292,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 3101,
                      "name": "综艺",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 4101,
                      "name": "娱乐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1101,
                      "name": "舞蹈",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "E5291D376CF89CB94778DF5CB546A1B7",
              "durationms": 223051,
              "playTime": 476948,
              "praisedCount": 3246,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_9BA86D6135FA7394F84707FE36C81B62",
              "coverUrl": "https://p2.music.126.net/JKDSYkRHSquB6Ro-A1s9ng==/109951163811939268.jpg",
              "height": 1080,
              "width": 1920,
              "title": "11岁小巨肺获得黄金按钮，达人秀上喜极而泣",
              "description": "歌手：Angelica Hale\n音乐：Rachel Platten - Fight Song\n节目：America's Got Talent（美国达人秀）\nAngelica Hale是菲律宾裔美国儿童歌手，9岁获得第12届美国达人秀亚军。\n19年她第二次参加美国达人秀，再次获得黄金按钮。",
              "commentCount": 285,
              "shareCount": 455,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 19868973
                  },
                  {
                      "resolution": 480,
                      "size": 34132797
                  },
                  {
                      "resolution": 720,
                      "size": 50752651
                  },
                  {
                      "resolution": 1080,
                      "size": 84328804
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 110000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/JJ9-kUtpp9dp6Cze-qJdaA==/109951163008355124.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 110111,
                  "birthday": 725817600000,
                  "userId": 356020622,
                  "userType": 0,
                  "nickname": "周易慌儿",
                  "signature": "",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951163008355120,
                  "backgroundImgId": 109951163009179070,
                  "backgroundUrl": "http://p1.music.126.net/95sBDRAHqrD549rskxZf_g==/109951163009179066.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 10,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "109951163008355124",
                  "backgroundImgIdStr": "109951163009179066",
                  "avatarImgId_str": "109951163008355124"
              },
              "urlInfo": {
                  "id": "9BA86D6135FA7394F84707FE36C81B62",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/kYzUj5vs_2272336422_uhd.mp4?ts=1611716353&rid=3009063014E119FC636C42FBC02D0085&rl=3&rs=zHelSWVYpMFuaElDVbCYXAwrmbaJfinp&sign=1663b6d3d2171b5b4636263e5c871a02&ext=f0xw0mOJqGcf8yfMQn4khLo0vOAZ2Oret6FDS9VvANIOB778zOa0GNkWKbpJigsU1/LRXD34eWSbIsfK5Nf586spdEE4Wri2VDcekpyg9chJ4eehs/uQrxQG2oM8W8tL/Rb8Frul7SS5uAWlhL0Sa4zrxViMlFYP/XEmQnu0w1l748Hj13A+tXGPf4/ofSpRhKe0uZ4JrXUfMmdCZaFTKJ2hSnTlDOSgrzI6FVBD+TY46DaSyeZ66ak17A2zfPNc",
                  "size": 84328804,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 94106,
                      "name": "选秀节目",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 75122,
                      "name": "欧美综艺",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 76108,
                      "name": "综艺片段",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 3101,
                      "name": "综艺",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 4101,
                      "name": "娱乐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58101,
                      "name": "听BGM",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "9BA86D6135FA7394F84707FE36C81B62",
              "durationms": 176688,
              "playTime": 631860,
              "praisedCount": 3758,
              "praised": false,
              "subscribed": false
          }
      }
    ]

    let {videoList} = this.data;
    videoList.push(...newVideoList)

    this.setData({
      videoList
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
    console.log('页面的下拉刷新')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面的上拉触底')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})