// pages/editInfo/editInfo.js
let time=require("../../utils/util.js") 
import areaList from "../../lib/city/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}, //存的用户信息
    nickname:'',
    sex:[{name:"保密",gender:0},
      { name: "男", gender: 1 },
      { name: "女", gender: 2}
    ],
    gender:'',
    showbirth:'', //展示的生日
    birthday:'',
    seecity:'', //展示的城市
    seeprovince:'', //展示的省份
    city: '',
    province: '',
    signature:'',
    flag:"",//性别动态样式
    areaList:{} ,//选择城市
    showGender: false,//性别弹出层
    showcity:false,//城市弹出层
    showBirthday: false,//性别弹出层
    currentDate: new Date().getTime(),
    minDate: new Date(1950, 1, 1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },
  confirmName(e){  //编辑昵称
    this.setData({
      nickname:e.detail
    })
    // console.log(this.data.nickname)
  },
  showBirthday(){  //点击生日
    this.setData({
      showBirthday: true
    })
  },
  
  confirmTime(e){ //点击日期确认
    this.setData({
      birthday: e.detail,
      showbirth: time.formatTimeTwo(e.detail, 'Y/M/D'),
       showBirthday: false
    })
   
  },
  cancelTime(){  //点击日期取消
    this.setData({
      showBirthday: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: areaList,
      user: wx.getStorageSync("user"),
      showbirth: time.formatTimeTwo(wx.getStorageSync("user").birthday,'Y/M/D'),
      seecity:areaList.city_list[wx.getStorageSync("user").city],
      seeprovince:areaList.province_list[wx.getStorageSync("user").province],
      nickname: wx.getStorageSync("user").nickname,
      birthday: wx.getStorageSync("user").birthday,
      city: wx.getStorageSync("user").city,
      province: wx.getStorageSync("user").province,
      signature: wx.getStorageSync("user").signature
    })
    if(wx.getStorageSync("user").gender === 2){
      this.setData({
        gender: "女"
      })
    }
      if (wx.getStorageSync("user").gender === 1) {
        this.setData({
          gender: "男"
        })
      }
        if (wx.getStorageSync("user").gender === 0) {
          this.setData({
            gender: "保密"
          })
        }
    // console.log(this.data.user)
  },
  showGender(){  //点击性别弹出层
    this.setData({
      showGender: true
    })
  },
  cancelGender() { //点击性别弹出层取消
    this.setData({
      showGender: false
    })
  },
  confirmGender(e) { //点击性别弹出层确认
    this.setData({
      showGender: false,
      gender: this.data.gender
    })
    // console.log(this.data.gender)
    if (this.data.genderr === 2) {
      this.setData({
        gender: "女"
      })
    }
    if (this.data.gender === 1) {
      this.setData({
        gender: "男"
      })
    }
    if (this.data.gender === 0) {
      this.setData({
        gender: "保密"
      })
    }
  },
  chooseGender(e){  //选择性别
    let item=e.currentTarget.dataset.item
    this.data.gender = item
    this.setData({
      flag: item
    })
  },
  changeCity(){ // 点击城市
    this.setData({
      showcity: true
    })
  },
  confirmCity(e){  //选择城市框确认
    this.setData({
      seeprovince: e.detail.values[0].name,
      seecity: e.detail.values[1].name,
      province: e.detail.values[0].code,
      city: e.detail.values[1].code,
      showcity: false
  })
    console.log(e)
  },
  cancelCity(){  //点击城市框取消
    this.setData({
      showcity:false
    })
  },
  confirmSign(e){  //编辑个性签名
  this.setData({
    signature:e.detail
  })
  },
  confirm(){  //点击确认
    this.data.user.nickname = this.data.nickname,
      this.data.sex.map(item => {
      if (item.name === this.data.gender){
        this.data.user.gender = item.gender
      }
      })
    this.data.user.birthday = this.data.birthday,
      this.data.user.province = this.data.province,
      this.data.user.city = this.data.city,
      this.data.user.signature = this.data.signature,
    this.setData({
      user:this.data.user
    })
    wx.setStorageSync('user', this.data.user)
    // console.log(this.data.user)
    wx.showToast({
      title: '资料修改成功',
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