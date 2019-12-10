const app = getApp()
let time = require("../../utils/util.js")
var WxParse = require('../../lib/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //传来的id
    // name: '', //传来的name 
    publishTime: [], //发布时间
    program: {}, //电台详情
    active:1,//控制导航栏
    content:[],//电台节目列表
    limit: 30,//默认显示30条
    start: 0,// 默认第一页
    count:0,//节目数
    // dj:{},//电台节目详情

  },
  getDj() {
    //电台节目
    app.globalData.fly.get(`/dj/program?rid=${this.data.id}&offset=${this.data.start}`).then(res => {
      res.data.programs.map(item=>{
        this.data.publishTime.push(time.formatTimeTwo(item.createTime, 'M-D'))
        if (item.listenerCount > 100000) {
          item.listenerCounts = (item.listenerCount / 10000).toFixed(1)
        }
        if (item.duration > 10000) {
          item.durations = Math.floor(item.duration)
        }
        item.allTime = this.editTime(item.durations)
      })
    if(this.data.start===0){
      this.setData({
        count: res.data.count,
      })
    }
      this.setData({
        content: this.data.content.concat(res.data.programs),
        publishTime: this.data.publishTime,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  editTime(time) {
    let t = Math.round(time / 1000)
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
  getdetail(){
       //电台详情
    app.globalData.fly.get(`/dj/detail?rid=${this.data.id}`).then(res => {
      // res.data.djRadio.commentDatas.map(item=>{
      //   this.data.content.push(WxParse.wxParse('article', 'md', item.content, this, 5))
      // })
      this.setData({
        program: res.data.djRadio,
        publishTime: this.data.publishTime,
        // content:this.data.content
      })

      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  play(e) { //跳转播放
    let djid = e.currentTarget.dataset.item;
    // console.log(djid)
    this.setData({
      content: this.data.content
    })
    // console.log(this.data.songList)
    wx.setStorageSync('songList', this.data.content)
    wx.setStorageSync('index', e.currentTarget.dataset.index)
    // console.log(wx.getStorageSync('songList')) 
    wx.navigateTo({
      url: `../../pages/play/play?djid=${djid}`,
    })
  },
  detail(){
    this.setData({  //导航栏
      active:0
    })
  },
  pro(){
    this.setData({
      active: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      // name: options.name
    })
    // console.log(this.data.name)
    this.getDj(),
    this.getdetail()
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
    this.setData({
      start: this.data.limit + this.data.start
    })
    this.getDj()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})