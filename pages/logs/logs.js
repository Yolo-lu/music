const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    phone:'',
    mail:'', //邮箱
    password:'',// 密码
    user:{}, //用户信息
    passwords:'',
    phoneLock:true,
    passwordLock: true,
    passwordsLock: true,
    mailLock:true
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      this.setData({
        phoneLock: false
      })
      return true
    }
    // console.log(e)
  },
  getPassword(e) {
    this.setData({
      password: e.detail.value
    })
    if (this.data.password.length < 6 || this.data.password.length > 16) {
      this.setData({
        passwordLock: false
      })
      return true
    }
  },
  getMail(e) {
    this.setData({
      mail: e.detail.value
    })
    if (!(/^[a-zA-Z]\w{5,17}@163.com/.test(this.data.mail))) {
      this.setData({
        mailLock: false
      })
      return true
    }
  },
  getPasswords(e){  //邮箱密码
    this.setData({
      passwords: e.detail.value
    })
    if (this.data.passwords.length < 6 || this.data.passwords.length > 16) {
      this.setData({
        passwordsLock: false
      })
      return true
    }
  },
  login(){ //点击登录 
  //手机登录
  if(this.data.active===0){
    app.globalData.fly.get(`/login/cellphone?phone=${this.data.phone}&password=${this.data.password}`).then(res => {
      this.setData({
        user: res.data.profile
      })
      if (wx.getStorageSync('user')) {
        wx.showToast({
          title: '你已经登录过了哦',
        })
      } else {
        wx.setStorageSync('user', this.data.user)
      }
    }).catch(err => {
      console.log(err)
    });
  }else{
    //邮箱登录
    app.globalData.fly.get(`/login?email=${this.data.mail}&password=${this.data.passwords}`).then(res => {
      this.setData({
        user: res.data.profile
      })
      if (wx.getStorageSync('user')){
        wx.showToast({
          title: '你已经登录过来哦',
        })
      }else{
        wx.setStorageSync('user', this.data.user)
      }
    }).catch(err => {
      console.log(err)
    });
  }
  wx.switchTab({
    url: '../../pages/mine/mine',
  })
  },
  register(){  //点击注册
    wx.navigateTo({
      url: '../../pages/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onChange(e){  //点击切换

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
