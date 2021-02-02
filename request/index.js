// 判断多少次请求 解决同时发送多个请求 加载图标显示bug问题
let ajaxTimes=0;
export const request = (params)=>{
    // 每次请求 都把ajxaTimes 加一
    ajaxTimes++;
    // 开启加载图标显示
    wx.showLoading({
        title: '加载中',
        mask:true
    })
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
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes === 0){
                    wx:wx.hideLoading()
                }
                
            }
        });
          
    })
}