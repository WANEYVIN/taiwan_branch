// miniprogram/pages/IDcard/IDcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // condition : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
      /* onLoad: function (optins) {
   /*
      *
      * * get user info from wechat and mapping with db and check if idcard and credit card info collected.
      * * identify if the user exist or not, if not then go ocr processing for the id card and credit card


  },
*/


  onLoad: function() {


    var app = getApp();

    app.globalData.member_id1=''

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    if(app.globalData.IsMember==0){ // if IsMember=0 then it is not exist member!

    // console.log("condition defining"+app.globalData.IsMember);
      this.setData({
        condition : 0
        // IsMember : app.globalData.IsMember

    })

    }else{
      //existing user // no longer show user's profile on this page , show tasks table instead
      /*
      this.setData({
        condition : 1, // condition = 1 means a registered member and all the properties will be shown on UI
        member_address: app.globalData.member_address,
        member_application: app.globalData.member_application,
        member_certificate: app.globalData.member_certificate,
        member_id: app.globalData.member_id,
        member_marrige: app.globalData.member_marrige,
        member_name: app.globalData.member_name,
        member_openID: app.globalData.member_openID,
        member_gender: app.globalData.member_gender,
        member_nationality:app.globalData.member_nationality,
        member_phone_num: app.globalData.member_phone_num,
        member_registered_addr: app.globalData.member_registered_addr,
        member_role: app.globalData.member_role,
        member_sn: app.globalData.member_sn
      })
*/

      // display current matched task for existing user.
      // if not matched then display all tasks

      var that = this;
      wx.request({
        url: 'https://www.top-talent.com.cn/linghuo/member_query.php?openid=' + app.globalData.openid,
        header:{
          'Content-Type': 'application/json'
        },

        success: function (res) {
          that.setData({
            list: res.data[0],
          })
          console.log("reload: ", res);
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
  /*
   * IDcard OCR
   */
  shenfenzheng(){
    this.photo("shenfenzheng")
  },

//拍照或者从相册选择要识别的照片
  photo(type) {

    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      // sourceType: ['album', 'camera'],
      sourceType: ['camera','album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let imgUrl = res.tempFilePaths[0];
        that.uploadImg(type, imgUrl)
      }
    })
  },



  // 上传图片到云存储
  uploadImg(type, imgUrl) {
    var current_time = new Date().getTime();
    var openid = wx.getStorageSync("openid");
    // wx.getStorageSync("openid")
    let that = this
    wx.cloud.uploadFile({
      // cloudPath: 'ocr/' + type + '.png', // I added for test
      // cloudPath: 'ocr/' + type + current_time +'.png',
      cloudPath: 'ocr/' + openid +'.png',
      filePath: imgUrl, // 文件路径
      success: res => {
        console.log("上传成功123", res.fileID, "cloudPath:", cloudPath)
        that.getImgUrl(type, res.fileID)
      },
      fail: err => {
        console.log("失败", err)
      }
    })
  },

  //获取云存储里的图片url
  getImgUrl(type, imgUrl) {
    let that = this
    wx.cloud.getTempFileURL({
      fileList: [imgUrl],
      success: res => {
        let imgUrl = res.fileList[0].tempFileURL
        console.log("获取图片url成功", imgUrl)
        // I addedd it for test
        that.shibie(type, imgUrl)
        // that.shenfenzheng(imgUrl)
      },
      fail: err => {
        console.log("获取图片url失败", err)
      }
    })
  },


  //调用云函数，实现OCR识别
  shibie(type, imgUrl) {
    let that = this
    wx.cloud.callFunction({
        name: "ocr",
        data: {
          type: type,
          imgUrl: imgUrl
        },
      success(res) {
        console.log("识别成功xx", res, " TYPE=", type, " IMAGE URL=", imgUrl)

        console.log("GET the ID number", res.result.id)
        var pass = that.IdentityCodeValid(res.result.id)
        getApp().globalData.member_id =res.result.id
        console.log("ID validation", pass)
        // console.log("ID validation2", that.IdentityCodeValid('830000199201300022'))


                  if (pass===true) {

                    var result = JSON.stringify(res)
                    wx.navigateTo({ // DO NOT USE SWITCH BAR AS URL
                      // url:'../test/test?info=test',
                      url: '../IDcheck/IDcheck?result=' + result,
                    })
                          } else {

                    wx.showModal({
                      title: '身分证号有误',
                      content: '请重新拍照',
                      success (res) {
                        if (res.confirm) {
                          that.photo("shenfenzheng")
                          console.log('用户点击确定,重新拍照')

                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })


                  }

             },
      fail(res) {
        console.log("识别失败123!!!", res, " TYPE=", type, " IMAGE URL=", imgUrl)
      }
    })
  },

 IdentityCodeValid(code) {

   // var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
   var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",83:"台湾",81:"香港",82:"澳门",91:"国外 "};

  var tip = "";

  var pass= true;
  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){

    tip = "身份证号格式错误";

    pass = false;

  }
  else if(!city[code.substr(0,2)]){

    tip = "地址编码错误";

    pass = false;

  }

  else{

    //18位身份证需要验证最后一位校验位

    if(code.length == 18){

      code = code.split('');

      //∑(ai×Wi)(mod 11)

      //加权因子

      var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];

      //校验位

      var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];

      var sum = 0;

      var ai = 0;

      var wi = 0;

      for (var i = 0; i < 17; i++)

      {

        ai = code[i];

        wi = factor[i];

        sum += ai * wi;

      }

      var last = parity[sum % 11];

      if(parity[sum % 11] != code[17]){

        tip = "校验位错误";

        pass =false;

      }

    }

  }

   // if(!pass) alert(tip);
   if(!pass) console.log(tip);

  return pass;

}




})



