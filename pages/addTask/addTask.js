// miniprogram/pages/addTask/addTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    submitButton:'確認提交',
    // shown_today:''
    uploaded:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var today = this.getToday()
    this.setData({
      today: today,
      shown_today:today,
      task_corporation: wx.getStorageSync("member_corporate")


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



  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, this.data.array[1])
    this.setData({
      index: e.detail.value,
      shown_marrige: this.data.array[e.detail.value]
      // member_marrige: this.data.array[e.detail.value]

    })
  },

  bindDateChange: function(e) {
    if(e.detail.value == this.getToday()){
      console.log("the same day, please add some more")
      wx.showModal({
        title: '提示',
        content: '终止日期最好别设为当天',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })



    }else{
      console.log("chose end date =",e.detail.value)
    }
    this.setData({
      shown_today: e.detail.value
    })
  },


  getToday: function(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return today = yyyy+'-'+mm+'-' +dd;
    // return today;
  },

  chooseDoc: function (e) {
    var that = this;
    /*
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
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
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFiles
       // that.setData({
       //   // uploadfiles: that.data.files.concat(res.tempFilePaths)
       //   uploadfiles: tempFilePaths
       //  });

        console.log("choose file res", res)
        var current_time = new Date().getTime();

        wx.uploadFile({
          // url: 'https://www.top-talent.com.cn/linghuo/addTask.php',
          url: getApp().globalData.serverURL+'/addTask.php',
          // filePath: tempFilePaths[0],
          filePath: res.tempFiles[0].path,
          name: 'file',
          formData:{
            'upload': '1'
            // 'filename': current_time
          },
          success (res){
            // const data = res.data
            //do something
            console.log("uploading1", res.data)
            that.setData({
              tmpFile_name : res.data,
              upload:'1',
              uploaded:'1'
            })
          },fail(res){
            console.log("uploading2", res)

          }
        })



      }



    })
  },


  insert2DB(e){
    var app = getApp();
    let that = this
    var task_owner = wx.getStorageSync("openid")


    console.log("all data=", e);
    console.log("OPENID=", app.globalData.openid);
    // that.globalData.openid
    // let{input_name,input_ID,input_addr,input_gender,input_nationality,input_birthday,input_phone,input_home,input_marriage,input_certificates}=e.detail.value;

    console.log("ADDR2=", e.detail.value.input_addr);
    console.log("phone =", e.detail.value.input_phone);
    console.log("birthday =", that.data.member_birthday);
    console.log("expiration =", that.data.member_id_expiration);

    that.setData({
      name: e.detail.value.input_name,
      id: e.detail.value.input_ID,
    })

    wx.request({
      // url: 'https://www.top-talent.com.cn/linghuo/addTask.php',
      url: getApp().globalData.serverURL+'/addTask.php',
      method:"POST",
      header:{
        // 'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //POST修改此处即可
      },

      data:{
        task_name: e.detail.value.input_task_name,
        task_description:e.detail.value.input_task_description,
        // task_date:$db->now(),
        task_expiration:that.data.shown_today,
        // task_category:e.detail.value.input_task_category,
        // task_requirement:e.detail.value.input_task_requirement,
        // task_num_recruiting:e.detail.value.input_task_num_recruiting, // no need here
        task_corporation:e.detail.value.input_task_corporation, // the owner who posted this task
        // task_contract:e.detail.value.input_task_contract, /// contract info
        task_certificate:e.detail.value.input_task_certificate?e.detail.value.input_task_certificate:'不限',
        task_owner:task_owner, /// the owner who posted this task
        task_contact:e.detail.value.input_task_contact,
        task_address:e.detail.value.input_task_address,
        // task_owner:wx.getStorageSync("openid"),
        tmpFile_name: that.data.tmpFile_name,
        submit:"1",
        uploaded:that.data.uploaded

/*
    id: e.detail.value.input_ID,
        addr: e.detail.value.input_addr,
        // birthday: e.detail.value.input_birthday,
        birthday: that.data.member_birthday,
        gender: e.detail.value.input_gender,
        nationality: e.detail.value.input_nationality,
        // type: e.detail.value.input_type,
        openid: wx.getStorageSync("openid"),
        // marriage:e.detail.value.input_marriage,
        // certificates:e.detail.value.input_certificates,
        // home_addr: e.detail.value.input_home,
        // phone_num:e.detail.value.input_phone,
        expiration:that.data.member_id_expiration
*/
      },


      success:function(ret){

        console.log('insert2DB result=',ret);

        // if(ret.data === that.data.id){
        //   return 1;
        // }else{
        //   return 0;
        // }


      }
    })


  },

  formSubmit: function (e){
    let that = this
    console.log("indsert new task content= ",e)

    var update = that.insert2DB(e);
    wx.showModal({
      // title: "提示"+update,
      content: "已送出",
      showCancel: false
    });

  }

})