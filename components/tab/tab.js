// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    goodslist:{
      type:Array,
      value:[]
    }
  },
  data: {
    setid:0
  },
  methods: {
    clcikList(e){
      let  id = e.currentTarget.dataset.id
      this.setData({
        setid:id
      })
    }
  }
})
