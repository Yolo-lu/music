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
  },
  ready() {
    this.setData({
      songList: wx.getStorageSync("songList"),
      indexs: wx.getStorageSync("index")
    })
    console.log(this.data.songList, 1)

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        show:false
      })
    }
  },
  
})
