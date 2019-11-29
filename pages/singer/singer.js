const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artists:[], //接口数据
    flag:true,
    singer: [
      { name: "入驻歌手 ", id: 5001},
      { name: "华语男歌手  ", id: 1001 },
      { name: "华语女歌手  ", id: 1002 },
      { name: "华语组合/乐队 ", id: 1003 },
      { name: "欧美男歌手  ", id: 2001 },
      { name: "欧美女歌手  ", id: 2002 },
      { name: "欧美组合/乐队 ", id: 2003 },
      { name: "日本男歌手  ", id: 6001 },
      { name: "日本女歌手  ", id: 6002 },
      { name: "日本组合/乐队  ", id: 6003 },
      { name: "韩国男歌手   ", id: 7001 },
      { name: "韩国女歌手    ", id: 7002 },
      { name: "韩国组合/乐队   ", id: 7003 },
      { name: "其他男歌手    ", id: 4001 },
      { name: "其他女歌手    ", id: 4002 },
      { name: "其他组合/乐队   ", id: 4003 },
    ],
    alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    newalphabet:'', //点击字母小类
    cat:5001,//接收头部大类的id
    start:0,// 默认第一页
    limit:30,//默认显示30条
    length: 30,  //数据条数
  },
  letter(e){  //点击小类字母
    this.setData({
      newalphabet:e.currentTarget.dataset.item,
      flag:false,
      start:0,
      artists:[]
    })
    this.getData()
  },
  changeHead(e){  //点击大类头部
    this.setData({
      cat: e.detail.name,
      newalphabet:'',
      start: 0,
      artists: []
    })
    this.getData()
  },
  getData() {
    //歌手
    app.globalData.fly.get(`/artist/list?cat=${this.data.cat}&initial=${this.data.newalphabet}&offset=${this.data.start}`).then(res => {
      this.setData({
        artists: this.data.artists.concat(res.data.artists),
        length: this.data.artists.length
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
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
    this.setData({
      start: this.data.limit + this.data.start
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})