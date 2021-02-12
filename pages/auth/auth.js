import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  data:{

  },

  power(e){
    // 用户信息
    const {encryptedData,rawData,iv,signature} = e.detail
    // 获取用户登录成功的code
    wx.login({
      timeout: 10000,
      success: async (result) => {
       const {code} =  result.code
       // 请求参数
      const params = {encryptedData,rawData,iv,signature,code}
      /* https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin */
      // 发送请求
      const res = await request ({url:'/users/wxlogin',data:params,method:'post'})
      console.log(res);
      // 账号无权限自定义token值
      },
    })
    
  }
})