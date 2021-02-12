                                                                                                                                                                                                                                                                                                                                                                                                                                                  // components/orders/orders.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orders:Array,
    index:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab(){
      console.log(this.data.index);
      
    }
  }
})
