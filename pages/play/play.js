const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //传来的id
    songList: [], //取出存的歌单
    index: '', //存的index
    songDetail: [], //歌曲详情
    title: '',
    url: [], //歌曲url
    flag: true, //控制播放页暂停
    backgroundAudio: {},
    currentTime: '',
    currentTimes: '',//未加工的当前时间
    allTimes: '', //未加工的总时间
    allTime: '',
    progress: '',
    active: 0, // 默认列表循环
    shows:false,//默认播放列表弹出层关闭
    program: {}, //电台详情
    djid:'',
    songlock:false,
    djlock: false
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
     if(this.data.id){
       //歌曲详情
       app.globalData.fly.get(`/song/detail?ids=${this.data.id}`).then(res => {
         if (res.data) {
           wx.hideLoading()
           this.setData({
             songDetail: res.data.songs,
             title: res.data.songs[0].al.name,
             songlock:true,
             djlock:false
           })
          //  console.log(this.data.songDetail)
           this.getUrl(this.data.id)
         }
       }).catch(err => {
         console.log(err)
         wx.hideLoading()
       });
     }
     if(this.data.djid){
       //电台详情
       app.globalData.fly.get(`/dj/program/detail?id=${this.data.djid}`).then(res => {
         if (res.data) {
           wx.hideLoading()
           this.setData({
             program: res.data.program,
             title: res.data.program.name,
             songlock: false,
             djlock: true
           })
           console.log(res)
           this.getUrl(this.data.djid)
         }
       }).catch(err => {
         console.log(err)
         wx.hideLoading()
       });
     }
  },
  getUrl(id) { //歌曲url
    app.globalData.fly.get(`/song/url?id=${id}`).then(res => {
      res.data.data.map(item => {
        if(item.url!==null){
          this.setData({
            url: item.url
          })
        }else{
          wx.showToast({
            title: '本首歌曲为VIP，请返回充值',
            icon: 'none',
            duration: 2000
          })
        }
     
      })
      wx.playBackgroundAudio({
        dataUrl: res.data.data[0].url,
        // title: this.data.songDetail[0].al.name,
        // coverImgUrl: this.data.songDetail[0].al.picUrl
      })
      console.log(res)
      let backgroundAudio = wx.getBackgroundAudioManager()
      backgroundAudio.src = this.data.url,
        backgroundAudio.title = this.data.title
      // backgroundAudio.play()
      this.setData({
        backgroundAudio,
      })
      this.data.backgroundAudio.onTimeUpdate(() => {
        this.setData({
          allTimes: this.data.backgroundAudio.duration,
          currentTimes: this.data.backgroundAudio.currentTime,
          currentTime: this.editTime(this.data.backgroundAudio.currentTime),
          allTime: this.editTime(this.data.backgroundAudio.duration),
          progress: this.data.backgroundAudio.currentTime / this.data.backgroundAudio.duration * 100
        })
        if(this.data.currentTimes===this.data.allTimes){
          if(this.data.active===2){
            this.setData({
              id: this.data.id
            })
            this.getData();
            this.getUrl(id)
          }else{
            this.next()
          }
        }
        // console.log(this.data.progress)
      })

    }).catch(err => {
      console.log(err)
    });
  },
  editTime(time) {
    let t = Math.round(time)
    if (t / 60 < 10) {
      if (t % 60 >= 10) {
        return `0${Math.floor(t / 60)} : ${t % 60}`
      } else {
        return `0${Math.floor(t / 60)} : 0${t % 60}`
      }
    } else {
      if (t % 60 > 10) {
        return `${Math.floor(t / 60)} : ${t % 60}`
      } else {
        return `${Math.floor(t / 60)} : 0${t % 60}`
      }
    }
  },
  onChange(event) { //进度条
    this.data.backgroundAudio.seek(Number(event.detail / 100 * this.data.allTimes)),
      this.setData({
        progress: event.detail
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      djid:options.djid,
      songList: wx.getStorageSync('songList'),
      index: wx.getStorageSync('index')
    })
    // console.log(this.data.djid)
    this.getData(),
    wx.setStorageSync('active', this.data.active)
  },
  play() { //播放
    this.setData({
      flag: !this.data.flag
    })
    this.data.backgroundAudio.play()
  },
  parden() { //暂停
    this.setData({
      flag: !this.data.flag
    })
    this.data.backgroundAudio.pause()
  },
  next() { //下一首
    if (this.data.active === 1) {
      this.data.index = Math.floor(Math.random() * this.data.songList.length)
      // console.log(this.data.index)
    } else {
      this.data.index++
        if (this.data.index > this.data.songList.length - 1) {
          this.data.index = 0
        }
    }
    this.setData({
      id: this.data.songList[this.data.index].id
    })
    wx.setStorageSync('index', this.data.index)
    this.getData();
    this.getUrl()
  },
  forword() { //上一首
    if (this.data.active === 1) {
      this.data.index = Math.floor(Math.random() * this.data.songList.length)
      // console.log(this.data.index)
    }else{
      this.data.index--
      if (this.data.index < this.data.songList.length - 1) {
        this.data.index = 0
      }
    }
    this.setData({
      id: this.data.songList[this.data.index].id
    })
    wx.setStorageSync('index', this.data.index)
    this.getData();
    this.getUrl()
  },
  order() { //点击顺序播放，切换到随机播放
    this.setData({
      active: 1,
    })
    wx.setStorageSync('active', this.data.active)
  },
  only() { //点击单曲循环，切换到顺序播放
    this.setData({
      active: 0,
    })
    wx.setStorageSync('active', this.data.active)
  },
  random() { //点击随机播放，切换到单曲循环
    this.setData({
      active: 2,
    })
    wx.setStorageSync('active', this.data.active)
  },
  playlist(){  //点击播放列表
    this.setData({
      shows:!this.data.shows
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})