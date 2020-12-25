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
    // matched: this.data.matched,
    // signOff: this.data.signOff


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      let task_block = JSON.parse(options.taskID);
    console.log("parameter sending : ",options.matched);
    console.log("signOff sending : ",options.signOff);
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
      matched: options.matched,
      signOff: options.signOff



    })
    console.log("task_id : ",that.data.list.task_id);

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
// record what user has chosen for marketing algorithm
    // getApp().globalData.log.send()
    getApp().globalData.log.onhide()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    getApp().globalData.log.onunload()

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
    // console.log( "contract = ",that.data.contractDoc)
    // var src = 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+wx.getStorageSync("task_id")+ '.pdf'
    var src = getApp().globalData.serverURL+'/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+wx.getStorageSync("task_id")+ '.pdf'
    console.log( "contract = ",src)

    wx.downloadFile({
      url: src,
      success: function (res) {

        console.log(res)
        if (res.statusCode != "404"){
          var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path,
          Type: 'pdf',
          showMenu: true,
          success: function (res) {
            console.log('打开文档成功')
            // wx.navigateBack({
            //   delta:1
            // })
            getApp().globalData.log.logging("user download the signed contract for checking",src)

          }
        })

      }else{
                  getApp().globalData.log.error("wx.downloadFile 404 file not found",src)

        }


      },
      fail:function (res){
        console.log(res)
        getApp().globalData.log.error("wx.downloadFile network failed",res)

      }
    })

  },
  goSignOff(e){
    // check if the personal profile completed?
    // if not go from scan
    // if yes, go to sign off
    getApp().globalData.log.logging("user go to sign off ,user has matched task but maybe not yet signed",e)

    console.log("get goSignOff",e)

/* currently useless, we are looking for some other ways to verify if the user registered
    if (wx.getStorageSync("member_certificate")!=null) {
      console.log("get Local Storage", wx.getStorageSync("member_certificate"))
    }
*/
    if(wx.getStorageSync("member_id")!=null && wx.getStorageSync("expiration")!=null){

      console.log("go to contract for sign off, member id = ", wx.getStorageSync("member_id")," expiration =",wx.getStorageSync("expiration"))

      wx.navigateTo({
        url:'../contract/contract?openid='+wx.getStorageSync("member_openID")+'&member_id='+wx.getStorageSync("member_id")+'&member_name='+wx.getStorageSync("member_name")+'&task_id='+this.data.list.task_id
      })
      console.log("navigate to  ",'../contract/contract?openid='+wx.getStorageSync("member_openID")+'&member_id='+wx.getStorageSync("member_id")+'&member_name='+wx.getStorageSync("member_name")+'&task_id='+this.data.list.task_id)
    getApp().globalData.log.logging("go to contract for sign off, ../contract/contract?openid=&member_id=",wx.getStorageSync("member_id"))

    }else{
      console.log("probably brand new user, not existing in database ,local storage is null member_id ,expiration", wx.getStorageSync("member_id"),wx.getStorageSync("expiration"))
      getApp().globalData.log.logging("switch back to myProfile, probably brand new user, not existing in database ,local storage is null member_id ,and expiration", wx.getStorageSync("expiration"))

      wx.switchTab({
            url: '../myProfile/myProfile',
          });
    }



  }

})