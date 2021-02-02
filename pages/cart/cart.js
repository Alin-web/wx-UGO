import { myInfo }  from '../../utils/asyncWx'
import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data:{
    myDetailInfo:{
    },
    goodsList:[],
    isShowLocation:true,
    isShowmyDetailInfo:false,
    num:1
  },
  onShow(){
    let info =  wx.getStorageSync('myDetailInfo')
    let goodsCartList = wx.getStorageSync('goodsCart')
    let goodsList = []
    goodsCartList.forEach(item => {
      let Obj =  {
        goods_img  : item.pics[0].pics_sma,
        goods_name : item.goods_name,
        goods_price: item.goods_price,
        goods_num  : item.num
      }
      goodsList.push(Obj)
      
    });
    console.log(goodsList);
    this.setData({
      myDetailInfo:info,
      goodsList:goodsList
    })
  },
  // 添加收获地址
  async address(){
    const myinfo = await myInfo()
    if(myinfo.authSetting["scope.address"]){
      await wx.chooseAddress({
        success: (result) => {
          this.setData({
            isShowLocation:false,
            isShowmyDetailInfo:true,
          })
          this.info(result)
        },
      })
    }
   
  },
  //抽离收货地址信息
  info(result){
    wx.setStorageSync('myDetailInfo', {
      "name":result.userName,
      "iphon":result.telNumber,
      "location":result.provinceName+result.cityName+result.countyName+result.detailInfo
    })
  },
  // 添加商品数量
  add(){
    let addnum =  this.data.num + 1 
    this.setData({
      num:addnum
    })
  },
  // 减少商品数量
  subtract(){
    if(this.data.num  === 1){
      wx.showToast({
        title: '商品数量最少为一件',
        icon: 'none',
        duration: 1000
      })
    }else{
      let jnum =  this.data.num - 1
      this.setData({
        num:jnum
      })
    }
  }
})