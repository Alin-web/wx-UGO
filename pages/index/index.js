// 导入请求模块
import {request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'
//Page Object
Page({
	data: {
		swiperList: [],
		catesList:[],
		FloorList:[]

	},
	onLoad: function (options) {
		this.getlbt()
		this.getCates()
		this.getFloor()
		
		  
	},
	// 获得轮播图数据
	async  getlbt(){
		const res =  await request({url: '/home/swiperdata'})
		this.setData({
			swiperList:res
		})
	},
	// 获得cates数据
	async getCates(){
		const res = await request({
			url:"/home/catitems",
		})
		this.setData({
			catesList:res
		})
	},
	// 获得楼层数据
	async getFloor(){
		const res = await request({
			url:"/home/floordata"
		})
		this.setData({
			FloorList:res
		})
	}
});
