const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    banner:[],// banner 图
    indicatorDots: true,//导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    songList:[]
  },
  
  ready() {
    this.getData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      app.globalData.fly.get('/banner?type=2').then(res => {
        this.setData({
          banner:res.data.banners
        })
        // console.log(this.data.banner)
      }).catch(err => {
        console.log(err)
      });
    },
    play(e) {  //跳转播放
      let id = e.currentTarget.dataset.item;
      this.setData({
        songList: this.data.songList
      })
      // wx.setStorageSync('songList', this.data.songList)
      // wx.setStorageSync('index', e.currentTarget.dataset.index)
      // console.log(wx.getStorageSync('songList')) 
      wx.navigateTo({
        url: `../../pages/play/play?id=${id}`,
      })
    },

  },

})
