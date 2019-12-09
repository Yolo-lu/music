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
    value:'',//搜索的值
    flag:true,//控制搜索
    show: false,//控制搜索建议
    lock:false,//控制热门搜索
    searchlock:false,//控制搜索详情
    allMatch:[],//搜索建议
    searchlock:false,//控制搜索历史
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
  inputs(e){  //搜索框确认confirm事件
    let searchHistory=wx.getStorageSync("values")
    if (searchHistory) {
      let arr = searchHistory;
      if (arr.indexOf(this.data.value) < 0) {
        arr.unshift(this.data.value);
        wx.setStorageSync("values", arr)
      }

    } else {
      let arr = [];
      arr.push(this.data.value);
      wx.setStorageSync("values", arr)
    }
    this.setData({
      value: e.detail.value,
      searchlock: true,
      show: false,
      lock:false
    })

    // console.log(this.data.searchlock)
  },
  reinput(e){  //实时搜索input事件
    this.setData({
      value: e.detail.value,
      show: true
    })
    //搜索建议
    if (this.data.inputValue !== '') {
      app.globalData.fly.get(`/search/suggest?keywords=${this.data.value}&type=mobile`).then(res => {
        this.setData({
          allMatch: res.data.result.allMatch
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
    }
  },
  search() {  //搜索框获取焦点
    this.setData({
      flag: false,
      lock:true,
    })
  },
  del(){//点击取消
    this.setData({
      flag: !this.data.flag,
      lock: false,
       show:false,
       value:''
    })
  },
  select(e){
    this.setData({
      value: e.detail
    })
    
    // console.log(e)
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