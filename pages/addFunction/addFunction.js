// pages/addFunction/addFunction.js

const code = `// 云函数入口函数
exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  return {
    sum: event.a + event.b
  }
}`
exports.add = (event, context, cb) => {
  return event.x + event.y
}

//
// // 云函数入口文件
// const cloud = require('wx-server-sdk')
//
// cloud.init()
//
// // 云函数入口函数
// exports.main = async (event, context) => {
//   try {
//     const result = await cloud.openapi.ocr.printedText({
//       type: event.type,
//       imgUrl: event.imgUrl
//     })
//     return result
//   } catch (err) {
//     return err
//   }
// };

Page({

  data: {
    result: '',
    canIUseClipboard: wx.canIUse('setClipboardData'),
  },

  onLoad: function (options) {

  },

  copyCode: function() {
    wx.setClipboardData({
      data: code,
      success: function () {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  testFunction() {
    wx.cloud.callFunction({
      // name: 'sum',
      name: 'add',
      data: {
        a: 1,
        b: 2
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        this.setData({
          result: JSON.stringify(res.result)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },

})

