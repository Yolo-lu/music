
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend: {
      type: Array,
      value: () => []
    },
    num:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    skip(e){  //跳转歌单详情
    let id=e.currentTarget.dataset.item
    // console.log(e)
      wx.navigateTo({
        url: `/pages/songlistDetail/songlistDetail?id=${id}`,
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
    dj(e) {  //跳转电台
      // console.log(e)
      let id = e.currentTarget.dataset.item
      let name = e.currentTarget.dataset.name
      // console.log(name)
      wx.navigateTo({
        url: `/pages/dj/dj?id=${id}&name=${name}`,
      })
    },
  },
  
})