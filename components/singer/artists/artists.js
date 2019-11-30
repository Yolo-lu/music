// components/artists/artists.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    artists:{
      type:Array,
      value:()=>[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    skip(e) {  //跳转歌单详情
      let id = e.currentTarget.dataset.item;
      // console.log(e)
      wx.navigateTo({
        url: `/pages/singerDetail/singerDetail?id=${id}`,
      })
    },
  },
// ready(){
//   console.log(this.data.artists)
// }
})
