//app.js
App({
  onLaunch: function () {
    const systemData = wx.getSystemInfoSync()
    this.globalData.screenWidth = systemData.windowWidth
    this.globalData.screenHeight = systemData.windowHeight
  },
  globalData: {
    userInfo: null,
    screenWidth: 0,
    screenHeight: 0
  }
})