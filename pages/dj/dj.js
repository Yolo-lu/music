const app = getApp()
let time = require("../../utils/util.js") 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//传来的id
    name:'', //传来的name 
    publishTime:'',//发布时间
    program:{},//电台详情
    // dj:{},//电台节目详情

  },
  getDj() {
    //电台节目详情
    // app.globalData.fly.get(`/dj/program/detail?id=${this.data.id}`).then(res => {
      
    //   this.setData({
    //     dj: res.data.program,
    //   })
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    //电台详情
    app.globalData.fly.get(`/playlist/detail?id=${this.data.id}`).then(res => {
      res.data.playlist.tracks.map(item => {
        this.setData({
          publishTime: time.formatTimeTwo(item.publishTime, 'M-D'),
        })
      })
      this.setData({
        program: res.data.playlist,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  play(e) {  //跳转播放
    let id = e.currentTarget.dataset.item;
    this.setData({
      songList: this.data.songList
    })
    // console.log(this.data.songList)
    wx.setStorageSync('songList', this.data.songList)
    wx.setStorageSync('index', e.currentTarget.dataset.index)
    // console.log(wx.getStorageSync('songList')) 
    wx.navigateTo({
      url: `../../pages/play/play?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      name:options.name
    })
    // console.log(this.data.name)
    this.getDj()
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