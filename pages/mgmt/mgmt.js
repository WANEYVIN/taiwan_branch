// miniprogram/pages/mgmt/mgmt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // if role =admin or manager stay or else return
    console.log("test99911= ", getApp().globalData.openid)
    // verifyRole;

    that.verifyRole(wx.getStorageSync('openid'));
    // console.log("openid= ", wx.getStorageSync('openid'))
    console.log("role= ", that.data.role)
    // console.log("role11= ", that.verifyRole(wx.getStorageSync('openid')))
    if (that.data.role=='admin')
    {
      console.log("this is a admin", that.data.role)
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
  var that = this
    console.log("role onSjhiow= ", that.data.role)
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


  clean_table(){
    wx.request({
      url: 'https://www.top-talent.com.cn/linghuo/empty_table.php',
      method:"GET",
      header:{
        'Content-Type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
      },
      success:function(ret){

        console.log('empty result=',ret.data);

        // console.log('member_id=',app.globalData.member_id);
        // console.log('openid=',that.globalData.openid);
        // console.log('memberid=',e.detail.value.input_ID);
wx.showModal({
          title: '清空會員數據庫',
          content: '結果'+ret.data
        })
      }
    })

      },
  addTask:function(){
    // wx.navigate(
        wx.navigateTo({
       url:'../addTask/addTask'
        })
    // )
  },
  listTask(){
    // wx.navigate(
        wx.navigateTo({
          url:'../listTask/listTask'
        })
    // )
  },

  verifyRole(openid){
    let that = this
    wx.request({
      url: 'https://www.top-talent.com.cn/linghuo/updateMemberRole.php?query="role"&id='+openid,
      method:"GET",
      header:{
        'Content-Type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
      },
      success:function(ret){

        console.log('verify result=',ret.data);

        that.setData({
          role: ret.data
        })
        console.log('verify result set data=',that.data.role);


        // return ret.data
        // console.log('member_id=',app.globalData.member_id);
        // console.log('openid=',that.globalData.openid);
        // console.log('memberid=',e.detail.value.input_ID);
        // wx.showModal({
        //   title: '清空會員數據庫',
        //   content: '結果'+ret.data
        // })
        // if
      }
    })

  }
})