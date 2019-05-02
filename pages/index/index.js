//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentPageIndex: 0,
    totalIndex: 4,
    istop: 'stop',
    startY: 0,
    endY: 0,
    margintop: 0
  },
  onReady() {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = "https://182.61.38.185:8001/music.mp3"
    this.innerAudioContext.autoplay = false
    this.innerAudioContext.loop = true
  },
  doTouchstart(e) {
    const pointY = e.touches[0].pageY
    this.setData({
      startY: pointY
    })
  },
  doTouchmove(e) {
    const pointY = e.touches[0].pageY
    const d = this.data
    this.setData({
      endY: pointY,
      margintop: d.endY - d.startY
    })
  },
  doTouchend(e) {
    const that = this
    if(this.data.endY - this.data.startY > 0 && Math.abs(this.data.margintop) > 100) {
      this.data.currentPageIndex > 0 ? this.setData({currentPageIndex: that.data.currentPageIndex-1}) : ''
    } else if(Math.abs(this.data.margintop) > 100) {
      this.data.currentPageIndex < this.data.totalIndex ? this.setData({currentPageIndex: that.data.currentPageIndex+1}) : ''
    }
    this.setData({
      startY: 0,
      endY: 0,
      margintop: 0
    })
  },
  pullDown() {
    const that = this
    this.data.currentPageIndex < this.data.totalIndex ? this.setData({currentPageIndex: that.data.currentPageIndex+1}) : ''
  },
  dostop() {
    const that = this
    this.setData({
      istop: (that.data.istop == 'stop' ? '' : 'stop')
    })
    this.stopMusic()
  },
  stopMusic() {
    this.data.istop == 'stop' ? this.innerAudioContext.play() : this.innerAudioContext.pause()
  }
})
