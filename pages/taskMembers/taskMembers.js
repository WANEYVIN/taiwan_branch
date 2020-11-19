// pages/taskMembers/taskMembers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("task id = ",options.task_id)

    let that = this
    that.setData({
      task_id:options.task_id
    })

    var taskMember = that.listMember(options.task_id)
    console.log("taskMember  = ", that.data.list)


    if (taskMember=='0'){
      wx.showModal({
        title: '本案無清單',
        content: '回到前頁',
        success (res) {
          // jump to scan the back side
          // that.bianshi1(type,imgUrl,result)
          // that.photo("shenfenzheng")
          if (res.confirm) {
            // jump to scan the back side
            wx.navigateTo({
              url: '../list_task/list_task',

            })

          }
        }
      })
    }


    // that.listMember(options.task_id)
    // console.log("MEMBER NAME: ",taskMember)
    // console.log("MEMBER NAME2: ",that.listMember(options.task_id))
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

  listMember: function(task_id){
    // console.log("click: ", e, e.currentTarget.id);
    let that = this
    // var task_id = e.currentTarget.id
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
        console.log("result of members: ", res);
        // console.log("name of members: ", JSON.parse(res));
        // console.log("string name of members: ", res.toString().data);



        // console.log("JSONstring name of members: ", JSON.parse(JSON.stringify(res.data[0][0][0].member_name)));

    if (res.data==0){
      console.log("ZERO: ", res.data);
      wx.showModal({
        title: '本任务暂无人员清单',
        content: '回到前页',
        success (res) {
          // jump to scan the back side
          // that.bianshi1(type,imgUrl,result)
          // that.photo("shenfenzheng")
          if (res.confirm) {
            // jump to scan the back side
            wx.navigateTo({
              url: '../listTask/listTask',

            })

          }
          if (res.cancel) {
            // jump to scan the back side
            wx.navigateTo({
              url: '../listTask/listTask',

            })

          }

        }
      })

    }else {

      var result = JSON.parse(JSON.stringify(res.data))
      // console.log("JSONstring name of members: ", JSON.parse(JSON.stringify(res.data[0][0][0].member_name)));


      that.setData({
        list: result,
        member_name: "姓名",
        phone: "电话",
        id: "身分证号",
        birthday: "生日",
        gender: "性别",
        signOff_date: "签署日期",
        approval: "现况",
        deleteButton:"在本任务删除该员",
        notSignOff: "尚未签署"
      })
    }// if =0


        // return that.data.list



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
  deletePersonnel: function (e){
    console.log("sn= ", e.currentTarget.id)

    wx.showModal({
      title: '删除该员',
      content: '若要在本任务删除该员，请按确定',
      success (res) {
        // jump to scan the back side
        // that.bianshi1(type,imgUrl,result)
        // that.photo("shenfenzheng")
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.serverURL+'/deleteTaskMember.php?sn='+e.currentTarget.id,
            header:{
              'Content-Type': 'application/json'
            },

            success: function (res) {
            console.log("respose from deleteTaskMember:  ", res.data)

              if(res.data ='1'){
                wx.showToast({
                  title: '该成员已从本任务删除',
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



  },

  downloadFile: function (e) {
    var that = this
    // contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/' + res.data.member[0].member_id + '/' + res.data.member[0].member_id +'-'+wx.getStorageSync("task_id")+ '.pdf'

    // var src = e.currentTarget.dataset.src; // 这个定义了一个属性src来存地址
    // var src = this.data.contractDoc; // 这个定义了一个属性src来存地址
    // var src = e.data.contractDoc; // 这个定义了一个属性src来存地址
    // console.log( "contract = ",this.data.contractDoc)
    // var src = 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+wx.getStorageSync("task_id")+ '.pdf'
    // var src = getApp().globalData.serverURL+'/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+wx.getStorageSync("task_id")+ '.pdf'
    var src = getApp().globalData.serverURL+'/contract/member_signoff/' + wx.getStorageSync("member_id") + '/' + wx.getStorageSync("member_id") +'-'+that.data.task_id+ '.pdf'
    console.log( "contract = ",src)

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