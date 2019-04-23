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
    istop: 'stop',
    lastY: 0,
    isTransition: false,
    animation: ''
  },
  onReady() {
    this.audioCtx = wx.createInnerAudioContext("myAudio")
  },
  handltouchstart(event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletouchmove(event) {
    if(this.data.isTransition) return
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
    if(this.data.isTransition) return
    if(that.data.currentPageIndex >= that.data.index || that.data.currentPageIndex < 0) return
    this.setData({
      isTransition: true
    })
    this.setData({
      currentPageIndex: that.data.currentPageIndex+1
    })
    that.doAnimation()
  },
  pullUp() {
    const that = this
    if(that.data.currentPageIndex > that.data.index || that.data.currentPageIndex <= 0) return
    this.setData({
      isTransition: true
    })
    this.setData({
      currentPageIndex: that.data.currentPageIndex-1
    })
    that.doAnimation()
  },
  doAnimation() {
    const that = this
    this.setData({
      top: -(that.data.height * that.data.currentPageIndex) + 'px'
    })
  },
  onLoad: function () {
    this.setData({
      width: +app.globalData.screenWidth,
      height: +app.globalData.screenHeight
    })
  },
  transitionEnd: function () {
    this.setData({
      isTransition: false
    })
  },
  dostop() {
    const that = this
    this.setData({
      istop: (that.data.istop == 'stop' ? '' : 'stop')
    })
    this.stopMusic()
  },
  stopMusic() {
    this.data.istop == 'stop' ? this.audioCtx.play() : this.audioCtx.stop()
  }
})
