const app = getApp()
let time = require("../../utils/util.js") 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//传来的id
    data:{},//歌手信息
    active:1,
    name:"主页",//标签栏的name
    hotAlbums:[],//专辑详情
    publishTime:[],//专辑发表时间
    mvs:[],//mv详情
    start: 0,// 默认第一页
    limit: 30,//默认显示30条
    more:false,//控制更多热歌
  },
  onChange(event) {
  //  console.log(event)
  this.setData({
    name: event.detail.name
  })
  console.log(this.data.active)
  },
  more(){ //点击更多热歌
  this.setData({
   name:'单曲',
   active:2
  })
  },
  brief(){ //点击更多信息
  this.setData({
    more:true
  })
  },
  getData() {
    //歌手详情
    app.globalData.fly.get(`/artists?id=${this.data.id}`).then(res => {
      this.setData({
        data:res.data
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    //专辑详情
    app.globalData.fly.get(`/artist/album?id=${this.data.id}&offset=${this.data.start}`).then(res => {
      res.data.hotAlbums.map(item => {
        this.data.publishTime.push(time.formatTimeTwo(item.publishTime, 'Y-M-D')) 
      })
      this.setData({
        hotAlbums: this.data.hotAlbums.concat(res.data.hotAlbums),
        // hotAlbums: res.data.hotAlbums,
        publishTime: this.data.publishTime
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    //mv详情
    app.globalData.fly.get(`/artist/mv?id=${this.data.id}&offset=${this.data.start}`).then(res => {
      this.setData({
        mvs: this.data.mvs.concat(res.data.mvs),
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    },
  back(){  //返回上一级
    wx.navigateBack({
      
    })
  },
  hotAlbums(e){  //跳转专辑
    let id = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `../../pages/singeralbums/singeralbums?id=${id}`,
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
    })
    this.getData()
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
    this.setData({
      start: this.data.limit + this.data.start
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})