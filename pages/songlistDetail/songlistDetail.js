const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//传来的id
    data:{}, //歌单详情
    songList:[],//要存的歌单
    indexs:0,//存的当前播放歌曲index
  },
  getData(){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/playlist/detail?id=${this.data.id}`).then(res => {
      if(res.data){
        wx.hideLoading()
        if (res.data.playlist.playCount > 10000) {
          res.data.playlist.playCounts = Math.floor(res.data.playlist.playCount / 10000)
          this.setData({
            data: res.data,
            songList: res.data.playlist.tracks
          })
        }
      }
  //  console.log(res)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  play(e){  //跳转播放
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
      indexs: wx.getStorageSync("index")
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})