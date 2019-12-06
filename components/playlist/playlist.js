// components/playlist/playlist.js
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
    show:true,
    active:0,
    songList:[],//存的歌单
    indexs:0,//存的index
    active:0,//存的播放模式
  },
  ready() {
    this.setData({
      songList: wx.getStorageSync("songList"),
      indexs: wx.getStorageSync("index"),
      active: wx.getStorageSync("active")
    })
    // console.log(this.data.songList, 1)

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        show:false
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
  },
  
})
