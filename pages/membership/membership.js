// miniprogram/pages/membership/membership.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label_nationality: "民族",
    contractDoc: '',
    dialog2: false,
    subscribe: "知道了",
    notice_request: "为了方便通知您，请允许我们传消息给您。",
    always_accept_request:"您也可以选总是允许，不再询问，以免每次询问打扰",
    request_title:"请求",
    request_subtile: "提醒通知"



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options)
    this.setData({
      task_id: options.task_id
    })

    this.updateMatchTable();
  },
  onShow: function ()  {
    var that = this


    if(wx.getStorageSync("member_id").substring(0,2)==='83') {
      that.setData({
        label_nationality: "證件屬籍:"
      })
    }

    that.setData({
      HOME:"回首页",
      downloadContract:"查看签署协议",
      myprofile:"完善个人资质",
      member_address:wx.getStorageSync("member_address"),
      member_application:wx.getStorageSync("member_application"),
      member_certificate:wx.getStorageSync("member_certificate"),
      member_id:wx.getStorageSync("member_id"),
      member_marrige:wx.getStorageSync("member_marrige"),
      member_name:wx.getStorageSync("member_name"),
      member_openID:wx.getStorageSync("member_openID"),
      member_gender:wx.getStorageSync("member_gender"),
      member_nationality:wx.getStorageSync("member_nationality"),
      member_phone_num:wx.getStorageSync("member_phone_num"),
      member_registered_addr:wx.getStorageSync("member_registered_addr"),
      member_role:wx.getStorageSync("member_role"),
      member_sn:wx.getStorageSync("member_sn"),
      member_birthday: wx.getStorageSync("member_birthday"),
      // contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/'+wx.getStorageSync("member_id")+'/'+wx.getStorageSync("member_id")+'-'+that.data.task_id+'.pdf'
      contractDoc: getApp().globalData.serverURL+'/contract/member_signoff/'+wx.getStorageSync("member_id")+'/'+wx.getStorageSync("member_id")+'-'+that.data.task_id+'.pdf'
      // contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/freelancer/'+wx.getStorageSync("member_id")+'/'+wx.getStorageSync("member_id")+'.pdf'
    })
////////////////







},
  downloadFile(e) {
    var that = this

    // var src = e.currentTarget.dataset.src; // 这个定义了一个属性src来存地址
    // var src = this.data.contractDoc; // 这个定义了一个属性src来存地址
    // var src = e.data.contractDoc; // 这个定义了一个属性src来存地址
    console.log( "contract = ",this.data.contractDoc)
    var src = this.data.contractDoc

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
  go_home:function(){
    let that = this

    that.setData({
      dialog2: true,
      path : '../index/index'
    })



  },
  myProfile: function(){
    // var that = this;
    let that = this

    that.setData({
      dialog2: true,
      path : '../myProfile/myProfile'
    })

    //
    //
    //
    // wx.switchTab({
    //     url: '../myProfile/myProfile'
    //          });
  },

  updateMatchTable:function(){
// *  this is for update the date of user's signing off and add path of signed off contract to the match table and flag condition in match table with 1
      var app = getApp();
      let that = this


      wx.request({
        // url: 'https://www.top-talent.com.cn/linghuo/update2DB.php',
        url: getApp().globalData.serverURL + '/updateMatchTable.php',
        method: "POST",
        header: {
          // 'Content-Type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
        },

        data: {
          member_id: wx.getStorageSync("member_id"),
          task_id: that.data.task_id,
          // date: NOW(),
          contract: getApp().globalData.serverURL+'/contract/member_signoff/'+wx.getStorageSync("member_id")+'/'+wx.getStorageSync("member_id")+'-'+that.data.task_id+'.pdf'


        },


        success: function (ret) {
          // that.globalData.openid= openid,
          // that.globalData.member_id=id
          console.log('db result ', ret.data);
          // console.log('member_id=',this.data.name);
          // console.log('member_id=',that.data.id);
          // return ret.data
          return ret.data


        }
      })


  },
  messageSubscription:function(){
    let that = this
  that.setData({
    dialog2: true
      })
  },

 close: function(path) {
    let that = this

   that.setData({
     dialog2: false,
   })
   wx.requestSubscribeMessage({
     tmplIds: ['mp6GxqAHDj4TUiop2I4Txd35ZM8UTVY_FUKPSCvzdNw'],

     // tmplIds: ['mCx2f5QrEiQfIdHdLL2z2fv28SO9zTieO7zBCldrOns'],

     success(res) {
       console.log("requestSubscribeMessage", res)

       wx.switchTab({
                 url: that.data.path
               })
       // return true
     },
     fail(res) {
       console.log("FAILED requestSubscribeMessage", res)

     }
   })
   // that.setData({
   //   // dialog2: false,
   //   subscribed:1
   // })


    },



  })

