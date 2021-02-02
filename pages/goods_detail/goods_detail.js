import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data: {
    goods_id:null,
    goods_detail:null
  },
  onLoad: function (options) {
    console.log(options.goods_id);
    this.setData({
      goods_id:options.goods_id
    })
    this.getGoodsDetail()
  },
  cartList : [],
  // 请求数据
  async getGoodsDetail(){
    const res = await request({
      url:"/goods/detail",data:{goods_id:this.data.goods_id}
    })
   this.cartList = res
    this.setData({
      goods_detail:res
    })
  },
  // 预览图片
  ylClick(e){
    let a =  e.currentTarget.dataset.img
    let index = e.currentTarget.dataset.index
    console.log(index);
    console.log(a);
    let arr = a.map((v)=>{
      return v.pics_mid
    })
    wx.previewImage({
      urls: arr,
      current: arr[index]
    })
  },
  // 跳转到购物车
  jumpCart(){
      wx.switchTab({
        url: '../cart/cart'
      });
  },
  // 加入购物车
  joincart(){
    let goodsCart = wx.getStorageSync('goodsCart');   
    let isSole = null
    const that = this
    if(goodsCart !==[]){
      isSole =  goodsCart.findIndex(v => v.goods_id === that.cartList.goods_id)
    }
    if(isSole === -1){
      this.cartList.num = 1
      goodsCart.push(this.cartList)
    }else{
      goodsCart[isSole].num += 1
    }
    wx.setStorageSync('goodsCart', goodsCart)
    wx.showToast({
      title: '添加成功',
      icon:'success'
    })
  }
})