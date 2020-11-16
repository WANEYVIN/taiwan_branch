// miniprogram/pages/viewTask/viewTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HOME:'回首页',
    KEEP:'保留',
    APPLY:'申请',
    role:''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      let task_block = JSON.parse(options.taskID);
      console.log("parameter sending : ",options.matched);
    console.log("task_block : ",task_block);

    that.setData({
      list: task_block,
      task_name: '職缺',
      task_corporation: '公司',
      task_date: '刊登日期',
      task_description: '工作內容',
      task_requirement: '要求資質',
      task_address: '工作地點',
      task_num_recruiting: '需求人數',
      task_expiration: '截止日期',
      matched: options.matched



    })

    if (wx.getStorageSync('openid')=='oMa-B4qh1ancRHPAr32QBHiTQGSk'){
      that.setData({
        role:'admin'
      })

    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  go_home:function() {
    wx.switchTab({
      url: '../index/index',
    });
  },

  downloadFile(e) {
    var that = this
    // contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/' + res.data.member[0].member_id + '/' + res.data.member[0].member_id +'-'+wx.getStorageSync("task_id")+ '.pdf'

    // var src = e.currentTarget.dataset.src; // 这个定义了一个属性src来存地址
    // var src = this.data.contractDoc; // 这个定义了一个属性src来存地址
    // var src = e.data.contractDoc; // 这个定义了一个属性src来存地址
    console.log( "contract = ",this.data.contractDoc)
    // var src = 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+wx.getStorageSync("task_id")+ '.pdf'
    var src = getApp().globalData.serverURL+'/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+wx.getStorageSync("task_id")+ '.pdf'

    wx.downloadFile({
      url: src,
      success: function (res) {
        console.log(res)
        var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path,
          Type: 'pdf',
          showMenu: true,
          success: function (res) {
            // console.log('打开文档成功')
            // wx.navigateBack({
            //   delta:1
            // })
          }
        })
      },
      fail:function (res){
        console.log(res)
      }
    })

  }

})