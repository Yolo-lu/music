const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null, //存的用户信息
    userInfo: {}, //用户详情
    events: [], //用户动态
    fans: [], //用户粉丝
    flag: true, //控制签到
    infolock: false, //控制登录信息
  },
  signIn() { //点击签到
    this.setData({
      flag: !this.data.flag
    })
  },
  signed() { //点击已签到
    this.setData({
      flag: !this.data.flag
    })
  },
  getUserInfo() {
    //用户详情
    if (this.data.user) {
      app.globalData.fly.get(`/user/detail?uid=${this.data.user.userId}`).then(res => {
        this.setData({
          userInfo: res.data,
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      //用户动态
      app.globalData.fly.get(`/user/event?uid=${this.data.user.userId}`).then(res => {
        this.setData({
          events: res.data.events
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      //用户粉丝
      app.globalData.fly.get(`/user/followeds?uid=${this.data.user.userId}`).then(res => {
        this.setData({
          fans: res.data.followeds
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.setData({
        infolock: false
      })
    }


  },
  login() { //跳转登录
    wx.navigateTo({
      url: '../../pages/logs/logs',
    })
  },
  skip() { //跳转编辑资料
    wx.navigateTo({
      url: '../../pages/editInfo/editInfo',
    })
  },
  logout() { //退出登录
    //用户详情
    app.globalData.fly.get('/logout').then(res => {
      if (res.data.code === 200) {

        this.setData({
          infolock: false
        })
        wx.removeStorageSync('user')
      }
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.setData({
      user: wx.getStorageSync("user"),
    })
    // console.log(this.data.infolock)
    this.getUserInfo()
    if (wx.getStorageSync("user")) {
      this.setData({
        infolock: true
      })
    }
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