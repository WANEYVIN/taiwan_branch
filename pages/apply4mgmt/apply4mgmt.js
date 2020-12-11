// pages/apply4mgmt/apply4mgmt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      approve:'请核准',
      btn_disable: false,
      // present: "1",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
   wx.request({
                  url: getApp().globalData.serverURL + '/updateMemberRole.php?query=list',
                  method: "GET",
                  header: {
                    'Content-Type': 'application/json'
                    // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
                  },
                  success: function (ret) {
                    console.log("apply for a manager: ", ret)

                      that.setData({
                          list: ret.data,
                          member_name: '申请人',
                          phone_num: '电话',
                          corporation:'公司',
                          default:false
                          // present:

                      })



                  }
                })
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

    approval(e){
        let that = this
        console.log("apply for a manager: e id ", e)
        console.log("apply for a manager: e id ", e.currentTarget.id)
        console.log("apply for a manager: e id ", e.currentTarget.dataset.sn)
        // const sw = document.getElementById(e.currentTarget.id)
        // sw.disabled = true
        var uid = e.currentTarget.id
// that.setData({
//     // approve: '已核准',
//     switching: false,
//     present: 0,
//
//     [uid]:false,
//     [e.currentTarget.dataset.sn]: true,
//     // [uid]:true,
//     // ['switching_'+uid]: true
//
// })

        wx.request({
            url: getApp().globalData.serverURL + '/updateMemberRole.php?query=approval&id='+e.currentTarget.id,
            method: "GET",
            header: {
                'Content-Type': 'application/json'
                // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
            },
            success: function (ret) {
                console.log("successfully updated ", ret)

                that.setData({
                    // approve:'已核准'


                })

            }
        })
        that.onLoad();
    }
})