const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend: [],//新歌推荐
    newPower:[],//音乐新势力
    radio:[],//推荐电台
    program:[],//推荐节目
  },
  getData() { 
    //新歌推荐
    app.globalData.fly.get('/personalized').then(res => {
      this.setData({
        recommend: res.data.result
      })

      // console.log(this.data.recommend)
      res.data.result.map(item => {
        if (item.playCount > 10000) {
          item.playCounts = Math.floor(item.playCount / 10000)
        }
        this.setData({
          recommend: this.data.recommend
        })
      })
    }).catch(err => {
      console.log(err)
    });
    //音乐新势力
    app.globalData.fly.get('/personalized/newsong').then(res => {
      this.setData({
        newPower: res.data.result
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
    //推荐电台
    app.globalData.fly.get('/personalized/djprogram').then(res => {
      this.setData({
        radio: res.data.result
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
    //推荐节目
    app.globalData.fly.get('/program/recommend').then(res => {
      this.setData({
        program: res.data.programs
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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