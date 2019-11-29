
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
    }
  },

})