// miniprogram/pages/listTask/listTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HR_id:'',
    task_name: '職缺',
    task_corporation: '公司',
    task_date: '刊登日期',
    task_description: '工作內容',
    task_requirement: '要求資質',
    task_address: '工作地點',
    task_num_recruiting: '需求人數',
    task_expiration: '截止日期',
    submitButton:"上传名单",
    listMembers:"招募狀況",
    dropProject:"撤销此案"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let that = this;

    wx.request({
      url: getApp().globalData.serverURL+'/list_task.php?id='+wx.getStorageSync("openid"),
      header:{
        'Content-Type': 'application/json'
      },

      success: function (res) {
        console.log("reload: ", res.data);
        console.log("reload2: ", getApp().globalData.member_id);
        that.setData({
          list: res.data,
        })




      },
      fail: function (res) {
        console.log("fail: ", res);
      },
      complete: function (res) {
        // wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh();
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
  onPullDownRefresh: function() {
    // var app =getApp();
    // var that = this;
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // console.log("reloading: ", app.globalData.openid);
    console.log("reloading: ", getApp().globalData.openid);


    this.onLoad();
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

  chooseDoc: function (e) {
    var that = this;
    console.log("echo e", e.currentTarget.id)
/*
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths

        wx.uploadFile({
          url: 'https://www.top-talent.com.cn/linghuo/task_member_mapping.php?id='+e.currentTarget.id,
          // filePath: tempFilePaths[0],
          // filePath: res.tempFiles[0].path,
          filePath: tempFilePaths[0],
          name: 'file',

          success (res){
            // const data = res.data
            //do something
            console.log("uploading", res.data)
            that.setData({
              tmpFile_name : res.data
            })
          },fail(res){
            console.log("uploading2", res)

          }
        })

      }
    })

*/


        wx.chooseMessageFile({
          count: 1,
          // type: 'image',
          type: 'file',
          success (res) {
            var filename = res.tempFiles[0].name
            that.setData({filename:filename});

            console.log("choose file res", res)
            var current_time = new Date().getTime();

            wx.uploadFile({
              // url: 'https://www.top-talent.com.cn/linghuo/task_member_mapping.php?id='+e.currentTarget.id,
              url: getApp().globalData.serverURL+'/task_member_mapping.php?id='+e.currentTarget.id,
              // filePath: tempFilePaths[0],
              filePath: res.tempFiles[0].path,
              name: 'file',

              success (res){
                // const data = res.data
                //do something
                console.log("uploading", res.data)
                that.setData({
                  tmpFile_name : res.data
                })

                wx.showModal({
                  // title: "提示"+update,
                  content: "已送出",
                  showCancel: false
                });


              },fail(res){
                console.log("uploading2", res)

              }
            })



          }



        })


  },

  listMember: function(e){
     console.log("click: ", e, e.currentTarget.id);

    var task_id = e.currentTarget.id

    wx.navigateTo({
      url: '../taskMembers/taskMembers?task_id='+task_id,

    })


    /*
    wx.request({
      url: getApp().globalData.serverURL+'/listMembers.php?id='+task_id,
      header:{
        'Content-Type': 'application/json'
      },

      success: function (res) {
        // console.log("reload: ", res.data);
        // console.log("reload2: ", getApp().globalData.member_id);
        // that.setData({
        //   list: res.data,
        // })




      },
      fail: function (res) {
        console.log("fail: ", res);
      },
      complete: function (res) {
        // wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh();
      }
    })

    */
  },
  dropProject:function (e){


    console.log("sn= ", e.currentTarget.id)

    wx.showModal({
      title: '撤销此案',
      content: '若要删除本任务，请按确定',
      success (res) {
        // jump to scan the back side
        // that.bianshi1(type,imgUrl,result)
        // that.photo("shenfenzheng")
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.serverURL+'/deleteTask.php?task_id='+e.currentTarget.id,
            header:{
              'Content-Type': 'application/json'
            },

            success: function (res) {
              console.log("respose from deleteTaskMember:  ", res.data)

              if(res.data ='1'){
                wx.showToast({
                  title: '本任务已删除',
                  icon: 'success',
                  duration: 2000
                })


              }else{
                wx.showToast({
                  title: '删除未成功请与管理员联系',
                  icon: 'ading',
                  duration: 2000
                })


              }

            },
            fail: function (res) {
              console.log("fail: ", res);
            },
            complete: function (res) {
              // wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh();
            }
          })

        }
        if (res.cancel) {
          // jump to scan the back side
          // wx.navigateTo({
          //   url: '../listTask/listTask',
          //
          // })

        }

      }
    })



  }
})
