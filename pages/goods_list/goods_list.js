// pages/goods_list/goods_list.js
import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({
  data: {
      list:[
        {
          id:0,
          name:'综合',
          active:true
        },
        {
          id:1,
          name:'销量',
          active:false
        },
        {
          id:2,
          name:'价格',
          active:true
        },
      ],
      goodslist:[]
  },
  goodsIndex:null,
  downId:null,
  list:null,
  num:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.downId = {'query':' ','cid':options.id,'pagenum':1,'pagesize':10}
    this.getGoods(this.downId)
  },
  async getGoods(query){
    const res = await request({ url:"/goods/search",data:query})
    console.log(res);
    this.list = res
    this.num =  Math.ceil(this.list.total/this.list.goods.length)
    
    this.setData({
      goodslist:res.goods
    })
  },
  //监听用户下拉动作
  onPullDownRefresh(){
    console.log('页面下拉刷新数据');
    setTimeout(()=>{wx.stopPullDownRefresh()},1000)
    this.downId = {'query':' ','cid':1,'pagenum':1,'pagesize':10}
    this.getGoods(this.downId)
  },
  // 触底事件
  async onReachBottom(){
    console.log('触底事件');
    this.downId.pagenum =this.downId.pagenum + 1
    const res = await request({ url:"/goods/search",data:this.downId})
    console.log(res);
    if(this.downId.pagenum > this.num){
      return
    }
    this.list.goods.push(...res.goods)
    this.setData({
      goodslist:[...this.list.goods]
    })
  }
})