// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详细地址
    //商品
    /* goods:[
      {
      isChoose:false,
      id:1,
      img:"http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000178667792_2_200x200.jpg",
      goods_name:"海信(Hisense)LED50MU8600UC 50英寸 4K超高清智能电视 HDR超薄曲面",
      price:1900,
      num:1
      },
      {
        isChoose:false,
        id:2,
        img:"http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_200x200.jpg",
        goods_name:"电视",
        price:20,
        num:1,
      }
    ], */
    goods:[],
    obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 商品详情
    let info =  wx.getStorageSync('myDetailInfo')
    // 购买的商品
    let goodsCartList = wx.getStorageSync('buy_Goods')
    this.setData({
      myDetailInfo:info,
      goods:goodsCartList,
      // options.obj 传递过来的总价格
      obj:JSON.parse(options.obj)
    })
  }
})