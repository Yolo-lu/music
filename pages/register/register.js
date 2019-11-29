// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    code:'',
    name:'',
    phoneLock:true,
    passwordLock:true
  },
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))){
      this.setData({
        phoneLock:false
      })
      return true
    }
    // console.log(e)
  },
  getPassword(e){
    this.setData({
      password: e.detail.value
    })
    // console.log(this.data.password)
    if (this.data.password.length < 6 || this.data.password.length>16){
      this.setData({
        passwordLock: false
      })
      return true
    }
  },
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  sendCode(){  
    //检测手机号码是否已注册
    app.globalData.fly.get(`/cellphone/existence/check?phone=${this.data.phone}`).then(res => {
     if(res.data.exist===1){
       wx.showToast({
         title: '该用户已注册，请直接登录',
       })
     }
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
    // 发送验证码
    app.globalData.fly.get(`/captcha/sent?phone=${this.data.phone}`).then(res => {
      // this.setData({
      //   newPower: res.data.result
      // })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  register(){
    //验证验证码
    app.globalData.fly.get(`/captcha/verify??phone=${this.data.phone}&captcha=${this.data.code}`).then(res => {
      // this.setData({
      //   newPower: res.data.result
      // })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
    //手机注册
    app.globalData.fly.get(`/register/cellphone?phone=${this.data.phone}&password=${this.data.password}&captcha=${this.data.code}&nickname=${this.data.name}`).then(res => {
      // this.setData({
      //   newPower: res.data.result
      // })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
 
  },
  login(){
    wx.navigateTo({
      url: '../../pages/logs/logs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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