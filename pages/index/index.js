//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    width: 0,
    height: 0,
    currentPageIndex: 0,
    index: 4,
    top: 0,
    lastX: 0,
    lastY: 0,
    animation: ''
  },
  onReady() {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      dalay: 100,
      transformOrigin: 'left top 0',
      success: function(res) {
        console.log('animation', res)
      }
    })
  },
  handleanimationend() {
    console.log('test')
  },
  handltouchstart(event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletouchmove(event) {
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    //上下方向滑动
    if (ty < 0)
      this.pullDown()
    else if (ty > 0)
      this.pullUp()
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  pullDown(event) {
    const that = this
    if(that.data.currentPageIndex >= that.data.index || that.data.currentPageIndex < 0) return
    this.setData({
      currentPageIndex: that.data.currentPageIndex+1
    })
    that.doAnimation()
  },
  pullUp() {
    const that = this
    if(that.data.currentPageIndex > that.data.index || that.data.currentPageIndex <= 0) return
    this.setData({
      currentPageIndex: that.data.currentPageIndex-1
    })
    that.doAnimation()
  },
  doAnimation() {
    const that = this
    this.setData({
      top: -(that.data.height * that.data.currentPageIndex)
    })
    this.animation.translate(0, this.data.top).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  onLoad: function () {
    this.setData({
      width: +app.globalData.screenWidth,
      height: +app.globalData.screenHeight
    })
  }
})
