//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options) {
    wx.getUserInfo({
      success:(e)=>{
        wx.setStorageSync('userInfo', e.userInfo)
      }
    })
    wx.setStorageSync('goodsCart', []);
  },
  onShow: function(options) {

  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  },
  globalData: {
    
  }
});
  