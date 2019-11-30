const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//传来的id
    data:{},//歌手信息
    active:0,
    name:"主页",//标签栏的name
  },
  onChange(event) {
  //  console.log(event)
  this.setData({
    name: event.detail.name
  })
  },
  getData() {
    //ges详情
    app.globalData.fly.get(`/artists?id=${this.data.id}`).then(res => {
      this.setData({
        data:res.data
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    },
  back(){  //返回上一级
    wx.navigateBack({
      
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})