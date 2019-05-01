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
    this.audioCtx = wx.createInnerAudioContext("myAudio")
  },
  doTouchstart() {},
  doTouchmove() {},
  doTouchend() {},
  pullDown() {
    console.log("pulldown")
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
