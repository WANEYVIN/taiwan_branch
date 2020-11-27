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
    dropProject:"撤销此案",
    copy:"复制此案内容",
    editing:"修改本案内容",
    checkContract:"检查合同协议",
    dialog1: false,
    preview: false

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

    wx.request({
      url: getApp().globalData.serverURL + '/listMembers.php?id=' + e.currentTarget.id,
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {

        console.log("result of members: ", res);

        if (res.data != 0) {
          console.log("ZERO: ", res.data);

          wx.showModal({
            title: '此案尚有成员！',
            content: '请将成员清空后再撤销此任务',
            success (res) {

              if (res.confirm) {
                wx.navigateTo({
                  url: '../taskMembers/taskMembers?task_id=' + e.currentTarget.id,

                })
              }

            }
          })

        }else{



    console.log("sn= ", e.currentTarget.id)

    wx.showModal({
      title: '撤销此案',
      content: '若要删除本任务，请按确定',
      success (res) {

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
      }
    })

  },
  copy:function(e){

    wx.request({
      url: getApp().globalData.serverURL+'/select_task.php?act=copy&id='+e.currentTarget.id,
      header:{
        'Content-Type': 'application/json'
      },

      success: function (res) {
        console.log("select from select task php:  ", res)
        console.log("select from select task php:1  ", res.data)




        wx.navigateTo({
          url: '../addTask/addTask?data=' + JSON.stringify(res.data),

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
  editing:function(e) {



  },

  checkContract:function(e) {
    console.log("e:  ", e)

    let that = this
    that.setData({
      dialog2: true,
      task_id: e.currentTarget.id,
      this_task_id:e.currentTarget.id
      // type: "专用"
    });
    wx.request({
      url: getApp().globalData.serverURL+'/select_task.php?act=contract&id='+e.currentTarget.id,
      header:{
        'Content-Type': 'application/json'
      },

      success: function (res) {
        console.log("select from select task php:  ", res.data)
        console.log("task name  ", res.data.task.task_name)

        if (res.data.jpg==null){
        var contractStatusjpg = " 协议预览图片 "
        }else{
          var contractStatusjpg = ""
        }
        if (res.data.pdf==null){
          var contractStatuspdf = " 协议文档 "
        }else{
          var contractStatuspdf = ""
        }
        if (res.data.type==null){
          var contractType = "为 "+res.data.task.task_name
        }else if (res.data.type=="specific"){
          var contractType = "为 "+res.data.task.task_name+"使用专用协议文件"

        }else{
          var contractType = "为 "+res.data.task.task_name+"使用通用协议文件"
        }
        // if (res.data.jpg==null || res.data.type==null || res.data.pdf==null){
          if (res.data.jpg==null  || res.data.pdf==null){
          var doc = "0"
        }else{
          var doc = "1"
        }

        that.setData({
          main_description: "本任务"+ contractType ,
          minor_description:"本任务尚缺乏"+contractStatusjpg+contractStatuspdf,
          download_tap: "下载",
          preview_tap:"查看",
          more:"更多",
          back:"返回",
          document: doc,
          upload_tap:"上传协议文档",
          copy_tap:"复制通用协议"
        });



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
  close: function() {
    this.setData({
      dialog1: false,
      dialog2: false
    });
  },

  preview_agreement:function (e){
    let that = this
    that.setData({
      preview: true,
      dialog2: false,

      imgUrl:getApp().globalData.serverURL+'/contract/templates/'+that.data.task_id+'/contract_template.jpg',  //图片路径
      contractDoc: getApp().globalData.serverURL+'/contract/templates/'+that.data.task_id+'/contract_template.pdf'

    });

  },

  download_agreement(e){

    let that = this
      // var src = e.currentTarget.dataset.src; // 这个定义了一个属性src来存地址
      // var src = this.data.contractDoc; // 这个定义了一个属性src来存地址
    var src =getApp().globalData.serverURL+'/contract/templates/'+that.data.task_id+'/contract_template.pdf'

    console.log("tap download",e,src)

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
              console.log('打开文档成功')
            }
          })
        },
        fail:function (res){
          console.log(res)
        }
      })


  },
  upload_agreement(e){
    console.log("upload e:", e)

      var that = this;

      wx.chooseMessageFile({
        count: 1,
        // type: 'image',
        type: 'file',
        success (res) {
          var filename = res.tempFiles[0].name
          that.setData({filename: filename});


          console.log("choose file res", res)
          var current_time = new Date().getTime();

          that.setData({
            upload: '1',
            uploaded: '1'
          })

          wx.uploadFile({
            // url: 'https://www.top-talent.com.cn/linghuo/addTask.php',
            url: getApp().globalData.serverURL + '/editTask.php',
            // filePath: tempFilePaths[0],
            filePath: res.tempFiles[0].path,
            name: 'file',
            formData: {
              // 'upload': '1',
              act: 'upload',
              task_id: e.currentTarget.id
              // 'filename': current_time
            },
            success(res) {
              // const data = res.data
              //do something

              console.log("result", res.data)
              if (res.data =="11"){
                that.setData({
                  dialog2: false

                })
                wx.showToast({
                  title: '上传协议完成',
                  icon: 'success',
                  duration: 2000
                })



              }

              // console.log("set uploaded =", that.data.uploaded)


            }, fail(res) {
              console.log("fail to choose file", res)

            }
          })
        }

      })




  },
  copy_agreement(e){
    let that = this
    console.log("cy agreement: ", e.currentTarget.id)



    wx.request({
      url: getApp().globalData.serverURL+'/editTask.php',
      data: {
        act:'copy',
        task_id:e.currentTarget.id


      },

      method: 'POST',

      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      // header:{
      //   'Content-Type': 'application/json'
      // },

      success: function (res) {
        console.log("copy edit task php:  ", res)
        // console.log("select from select task php:1  ", res.data)
if (res.data =="1"){
  that.setData({
    dialog2: false

  })
  wx.showToast({
    title: '复制通用协议完成',
    icon: 'success',
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


  })
