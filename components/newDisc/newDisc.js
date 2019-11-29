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
    active:0,
    albums:[],//获取新碟
    data:null,//获取新歌
  },
ready(){
  this.getAlbum()
},
  /**
   * 组件的方法列表
   */
  methods: {
    newDisc(){  //点击新碟
      this.setData({
        active:0
      })
    },
    newSong() {  //点击新歌
      this.setData({
        active: 1
      })
      if (!this.data.data) {
        this.getSong()
      }
    },
    skipDetail(e){
      let id=e.currentTarget.dataset.item
      console.log(id)
      wx.navigateTo({
        url: `/pages/albums/albums?id=${id}`,
      })
    },
    getAlbum() { 
      //新碟
      app.globalData.fly.get('/album/newest').then(res => {
        this.setData({
          albums: res.data.albums
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    },
    getSong(){
      //新歌
      app.globalData.fly.get('/top/song').then(res => {
        this.setData({
          data: res.data.data
        })
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
    }
  }
})
