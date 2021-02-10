import { myInfo }  from '../../utils/asyncWx'
import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data:{
    myDetailInfo:{
    },
    goods:[],
    isShowLocation:true,
    isShowmyDetailInfo:false,
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
    obj:{
      allChoose:false,
      price:0,
      goods_num:0
    }
  },
  onShow(){
    let info =  wx.getStorageSync('myDetailInfo')
    let goodsCartList = wx.getStorageSync('goodsCart')
    let goodsList = []
    goodsCartList.forEach(item => {
      let Obj =  {
        id : item.goods_id,
        img  : item.pics[0].pics_sma,
        goods_name : item.goods_name,
        price: item.goods_price,
        num  : item.num,
        isChoose:false
      }
      goodsList.push(Obj)
    });
    console.log(goodsList);
    this.setData({
      myDetailInfo:info,
      goods:goodsList,
      obj:{
        allChoose:false,
        price:0,
        goods_num:0
      }
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
  add(e){
    let getId = e.currentTarget.dataset.id
    let choose =  this.data.goods.find(item=>{
        if(item.id === getId)
        return item
    })
    let index = this.data.goods.indexOf(choose)
    let nums = choose.num + 1
    let addnum = 'goods['+ index +'].num'
    this.setData({
      [addnum] : nums
    })
    this.get_total_price()
  },
  // 减少商品数量
  subtract(e){
    let getId = e.currentTarget.dataset.id
    let choose =  this.data.goods.find(item=>{
        if(item.id === getId)
        return item
    })
    let change =  this.data.goods
    let index = this.data.goods.indexOf(choose)
    let nums = choose.num - 1
    let that = this
    if(this.data.goods[index].num  === 1){
      wx.showModal({
        title: '确认是否删除',
        success(res){
          if(res.confirm){
            change.splice(index,1)
            that.setData({
              goods:change.splice(index,1)
            })
          }
        }
      })
    }else{
      let addnum = 'goods['+ index +'].num'
      this.setData({
        [addnum] : nums
      })
    }
    this.get_total_price()
  },
  //勾选单个商品复选框
  clickCheckbox(e){
    let getId = e.currentTarget.dataset.id
    let choose =  this.data.goods.find(item=>{
        if(item.id === getId)
        return item
    })
    let index = this.data.goods.indexOf(choose)
    let nums =  !choose.isChoose
    let addnum = 'goods['+ index +'].isChoose'
    this.setData({
      [addnum] : nums
    })
    this.get_total_price()
  },
  // 勾选全选按钮
  allChoose(){
    // 点击切换按钮状态
    let change = 'obj.allChoose'
    this.setData({
      [change]: !this.data.obj.allChoose
    })
    // 判断按钮状态
    if(this.data.obj.allChoose){
     // 改变所有商品选中状态
     this.changeChoose(this.data.obj.allChoose)
      // 计算商品总价格
      this.get_total_price()
      
    }else{
      this.changeChoose(this.data.obj.allChoose)
      this.setData({
        obj:{
          allChoose:false,
          price:0,
          goods_num:0
        }
      })
    }
    
  },
  // 商品总价
  get_total_price(){
    let total_price = 0
    let goods_num = 0
    this.data.goods.forEach(item=>{
      /* console.log('物品单价：'+item.price,'物品数量:'+item.num); */
      if(item.isChoose){
        total_price +=  item.price * item.num
        goods_num += item.num
      }
    })
    let price = 'obj.price'
    let num =  'obj.goods_num'
    console.log('物品'+total_price);
    this.setData({
      [price]:total_price,
      [num]:goods_num
    })
  },
  // 更改所有商品状态
  changeChoose(bool){
     // 更改所有商品按钮状态
     console.log(bool);
     this.data.goods.forEach((item,index)=>{
      let single_goods = 'goods['+index+'].isChoose'
      this.setData({
        [single_goods]:bool
      })
    })
  },
  //跳转到支付页面
  jumpPay(){
    let buy_Goods  = []
    if(!this.data.isShowmyDetailInfo){
      wx.showToast({
        title: '请添加收货地址',
        icon:'none'
      })
    }else{
      if(this.data.obj.goods_num === 0 ){
        wx.showToast({
          title: '请选择商品',
          icon:'none'
        })
      }else{
        this.data.goods.forEach(item=>{
          if(item.isChoose){
            buy_Goods.push(item)
          }
          wx.setStorageSync('buy_Goods', buy_Goods)
        })
        wx.navigateTo({
          url: `../pay/pay?obj=${JSON.stringify(this.data.obj)}`
        })
        
      }
    }
  }
})