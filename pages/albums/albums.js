const app = getApp()
let time = require("../../utils/util.js") 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",//传来的id
    albums: [],//获取新碟
    time:'',//发行时间
    songs:[],//获取专辑歌曲
    commentCount:0,//评论数
    subCount:0,//分享数
  },
  back(){
    wx.navigateBack({
      
    })
  },
  getAlbum() {
    //新碟
    app.globalData.fly.get('/album/newest').then(res => {
      res.data.albums.map(item=>{
        this.setData({
          time: time.formatTimeTwo(item.publishTime, 'Y-M-D'),
        })
      }),
      this.setData({
        albums: res.data.albums
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  getAlbumSong() {
    //专辑歌曲
    app.globalData.fly.get(`/album?id=${this.data.id}`).then(res => {
      this.setData({
        songs: res.data.songs
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  getAlbumInfo() {
    //专辑动态信息
    app.globalData.fly.get(`/album/detail/dynamic?id=${this.data.id}`).then(res => {
      this.setData({
        subCount: res.data.subCount,
        commentCount: res.data.commentCount
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
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
    // console.log(options)
    this.setData({
      id: Number(options.id)
    })
    this.getAlbum()
    this.getAlbumSong()
    this.getAlbumInfo()
    // console.log(typeof this.data.id)
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