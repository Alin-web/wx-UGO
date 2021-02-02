export const myInfo = ()=>{
  return new Promise((resolve,reject)=>{
      wx.getSetting({
        withSubscriptions: true,
        success:(result1)=>{
          resolve(result1)
        },
        fail:(err)=>{
          reject(err);
        }
      })
  })
}