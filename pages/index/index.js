//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentPageIndex: 0,
    totalIndex: 3,
    istop: 'stop',
    startY: 0,
    endY: 0,
    margintop: 0,
    food: {
      xianchao: [
        {name: '农家小炒肉', price: 22},
        {name: '红烧茄子', price: 18},
        {name: '香辣牛肚', price: 28},
        {name: '口水鸭', price: 28},
        {name: '回锅牛肉', price: 32},
        {name: '小笋子炒五花肉', price: 18},
        {name: '外婆菜炒肉末', price: 16},
        {name: '青椒肉丝', price: 22},
        {name: '青椒回锅肉', price: 28},
        {name: '青椒炒蛋', price: 16},
        {name: '红烧鱼块', price: 22},
        {name: '香干炒肉', price: 18},
        {name: '酸辣鸡杂', price: 22}
      ]
    },
    longxia: [
      {name: '牛蛙', price: 68},
      {name: '麻辣油焖小龙虾', price: 68},
      {name: '香辣小龙虾', price: 68},
      {name: '十三香小龙虾', price: 68},
      {name: '蒜蓉小龙虾', price: 68},
      {name: '招牌肉蟹煲', price: 88},
      {name: '干锅牛腩', price: 68},
      {name: '干锅啤酒鸭', price: 68},
      {name: '平锅草鱼', price: 68}
    ]
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
