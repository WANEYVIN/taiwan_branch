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
    console.log("option: ", JSON.parse(options.data));
    var copiedTask = JSON.parse(options.data)[0]
    console.log("copiedTask: ", copiedTask.task_requirement);


    var today = this.getToday()
    this.setData({
      today: today,
      shown_today:today,
      task_corporation: wx.getStorageSync("member_corporate"), // maybe in the future, find a new way to identify the manager
      task_name: copiedTask.task_name?copiedTask.task_name:'',
      task_certificate: copiedTask.task_requirement?copiedTask.task_requirement:'',
      task_description: copiedTask.task_description?copiedTask.task_description:'请描述工作內容',
      task_address: copiedTask.task_address?copiedTask.task_address:'',
      member_registered_addr:copiedTask.member_registered_addr?copiedTask.member_registered_addr:'',
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

        that.setData({
          upload:'1',
          uploaded:'1'
        })

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
            console.log("chooseFILE", res.data)
            that.setData({
              tmpFile_name : res.data,
              upload:'1',
              uploaded:'1'
            })
            console.log("set uploaded =", that.data.uploaded)


          },fail(res){
            console.log("fail to choose file", res)

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


      },


      success:function(ret){

        console.log('insert2DB result=',ret);




      }
    })


  },

  formSubmit: function (e){
    let that = this
    console.log("indsert new task content= ",e)

    var vp = that.validateExpiration(e)

    console.log("validateExpiration ",vp)

    // if (that.validatePhone(e)){
    //   if (that.validateExpiration(e)){
    if (that.validatePhone(e) && that.validateExpiration(e)){

    // upload the new task
    var update = that.insert2DB(e);
    wx.showModal({
      content: "已送出",
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateBack()
        }
      }
    });

      // }
    }



  },


  validatePhone(e){
    if(e.detail.value.input_task_contact==''){
      wx.showModal({
        title: '提示',
        content: '请填联络电话',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    }else{
      return true;
    }
  },
  validateExpiration(e){
    let that = this
    // check the expiration setting
    if (that.data.shown_today == that.getToday()) {
      console.log("the same day, please add some more")
      wx.showModal({
        title: '提示',
        content: '终止日期最好别设为当天',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')



          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    return false;
    } else {
      console.log("chose end date =", e.detail.value)
      return true;

    }
  },


  getPhoneNumber(e) {
    console.log('ERR MSG', e.detail.errMsg)
    console.log('iv', e.detail.iv)
    console.log('DATA', e.detail.encryptedData)

    let that = this


    getApp().userLogin().then(

        function (res){
          console.log("promise回调后的数据session_key："+res.data.session_key);
          console.log("res in page= ",res);
          // var test = that.GetData(res.data.openid);
          // console.log("if res true : ", test);
          that.setData({
            condition: 1,
            openid : res.data.openid,
            session_key : res.data.session_key



          })

          console.log("POST parameters: data : ",e.detail.encryptedData);
          console.log("POST parameters: iv : ",e.detail.iv);
          console.log("POST parameters: session : ",that.data.session_key);
          wx.request({
            url: getApp().globalData.serverURL + '/getOpenID.php',
            data: {
              //   // code: code,
              encryptedData:e.detail.encryptedData,
              // encryptedData:"HoLM9cNa1Y5sl4nb1XZmSZCYSxmVbkpOVbYqQ+H9iQP7CnQUzKFzBX96VjfNb/C8IZyA4WPbQctlkdZ3Rr2q2SaEhUomAEoLkHZ2JTCUuvs5CjnHdxF+nIG8fSJzhH3kQRqVSU+Yg9OvPO8YoZo+6+2LbIvN8FiLOMps7BsSCLeQUY/m6rGahFZDqWW2OI00tuhh7pCGDlhGtYUGHHlXcw==",
              iv:e.detail.iv,
              sessionKey:that.data.session_key

            },

            method: 'POST',

            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("encryptedData :",e.detail.encryptedData);
              console.log("iv :",e.detail.iv);
              console.log("sessionKey :",that.data.session_key);
              console.log("total res :",res);


              console.log("login result",res.data.phoneNumber);
              // return that.globalData.openid
              if (res.data.phoneNumber!= '') {
                that.setData({
                  member_registered_addr: res.data.phoneNumber,
                })
              }


            }
          })






        }
        ,
        function (res){

          console.log("promise rejected  : "+res);


        })

  }




})