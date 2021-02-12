import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    ,orders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    console.log(options.type);
    const header ={ Authorization:this.data.token}
    const datas = {type:options.type}
    const {orders} =  await request({url:'/my/orders/all',data:datas,header:header})
    this.setData({
      orders:orders,
      index:options.type
    })
  },
})