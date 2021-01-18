// pages/category/category.js
import {request} from '../../request/index'
// 使用 async await 
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		leftMenuList:[],
		rightMenuList:[],
		clickId:0,
		scrollTop:0,
	},
	// 总数据
	Cates:[],
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		/* 使用缓存 进行数据存储
			实现思路：1 获取缓存,判断缓存是否存在
				2 缓存不存在调用接口请求数据
				3 缓存存在 判断缓存过期是否过期
				4 如果过期 重新请求
				5 不过期 使用缓存数据
		*/
		const menuList = wx.getStorageSync('setList');
		if(!menuList){
			this.getData()
		}else{
			// 定义缓存数据过期时间 30秒钟之后在发送数据请求
			if(Date.now() - menuList.time > 1000*10){
				console.log('数据过期 从新发送请求');
				this.getData()
			}else{
				// 可以使用旧数据
				console.log('可以使用旧数据');
				
				this.Cates = menuList.data;
				let leftMenuList = this.Cates.map( v => v.cat_name);
				let rightMenuList = this.Cates[0].children;
				this.setData({
					leftMenuList:leftMenuList,
					rightMenuList:rightMenuList
				})
			}
		}
		
	},
	// 获取初始化数据
	async getData(getid){
		let id = 0
		id = getid ? getid : 0
		
		const res = await request({
			url:"/categories"
		})
		//总数据
		this.Cates = res,
		// 把获取到的数据存储起来 因为需要用到其他接口的返回值 所以要用异步Api
		wx.setStorageSync('setList',{time:Date.now(),data:this.Cates });

		let leftMenuList = this.Cates.map( v => v.cat_name)
		let rightMenuList = this.Cates[id].children
		this.setData({
			leftMenuList:leftMenuList,
			rightMenuList:rightMenuList
		})
	},
	clcikItem(e){
		let id = e.currentTarget.dataset.id;
		
		this.setData({
			clickId:id,
			scrollTop:0
		})
		this.getData(id)
	}
})