// miniprogram/pages/membership/membership.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label_nationality: "民族",
    contractDoc: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options)
    this.setData({
      task_id: options.task_id
    })
  },
  onShow: function ()  {
    var that = this
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
///////////////


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



    // wx.login({
    //   success: function (res) {
    //     var code = res.code;
    //
    //     console.log("cd= "+app.globalData.openid)
    /*
        wx.request({
          // url: '后台通过获取前端传的code返回openid的接口地址',
          // url: 'https://www.top-talent.com.cn/linghuo/membership.php?uid='+app.globalData.openid,
          url: 'https://www.top-talent.com.cn/linghuo/membership.php?uid='+wx.getStorageSync("openid"),

          // data: { code: code },
          // method: 'POST',
          method: 'GET',
          header: { 'content-type': 'application/json'},
          success: function (res) {
            // console.log("status= "+res.statusCode);
            console.log("1 OPEN ID= "+ res.data.member[0].member_address);

            if (res.statusCode == 200) {
              // console.log("UNION ID= "+ res.data.result.unionid);
              // that.globalData.openid= res.data.openid
              // that.globalData.IsMember=res.data.IsMember
              // if (res.data.IsMember !=0) {


              that.setData({
                member_address: res.data.member[0].member_address,
                member_application: res.data.member[0].member_application,
                member_certificate: res.data.member[0].member_certificate,
                member_id: res.data.member[0].member_id,
                member_marrige: res.data.member[0].member_marrige,
                member_name: res.data.member[0].member_name,
                member_openID: res.data.member[0].member_openID,
                member_gender: res.data.member[0].member_gender,
                member_nationality:res.data.member[0].member_nationality,
                member_phone_num: res.data.member[0].member_phone_num,
                member_registered_addr: res.data.member[0].member_registered_addr,
                member_role: res.data.member[0].member_role,
                member_sn: res.data.member[0].member_sn,
                contractDoc: 'https://www.top-talent.com.cn/linghuo/contract/member_signoff/freelancer/'+res.data.member[0].member_id+'/'+res.data.member[0].member_id+'.pdf'
              })
                // that.globalData.member_address = wx.getStorageSync("member_address
                // that.globalData.member_application = res.data.member[0].member_application
                // that.globalData.member_certificate = res.data.member[0].member_certificate
                // that.globalData.member_id = res.data.member[0].member_id
                // that.globalData.member_marrige = res.data.member[0].member_marrige
                // that.globalData.member_name = res.data.member[0].member_name
                // that.globalData.member_openID = res.data.member[0].member_openID
                // that.globalData.member_gender = res.data.member[0].member_gender
                // that.globalData.member_nationality = res.data.member[0].member_nationality
                // that.globalData.member_phone_num = res.data.member[0].member_phone_num
                // that.globalData.member_registered_addr = res.data.member[0].member_registered_addr
                // that.globalData.member_role = res.data.member[0].member_role
                // that.globalData.member_sn = res.data.member[0].member_sn
              // } // isMember>0 which is member and will return properties
              // console.log("2 OPEN ID= "+ res.data.openid+"    ---   SESSIID = "+res.data.session_key+" other factor ="+res.data.IsMember);



            } else {
              console.log(res.errMsg)
            }
            // console.log( "contract = ", that.data.contractDoc)

          }
        })
*/




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
    wx.switchTab({
      url: '../index/index',
    });

  },
  myProfile: function(){
    var that = this;




      wx.switchTab({
        url: '../myProfile/myProfile'
             });
  }
})

