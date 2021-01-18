export const request = (params)=>{
    let beasUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
    wx.request({
           ...params,
           url:beasUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}